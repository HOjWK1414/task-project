using API.Configuration;
using BusinessLayer.Interfaces;
using BusinessLayer.Services;
using Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Naèti konfiguraci
var jwtSection = builder.Configuration.GetSection("JwtSettings");
builder.Services.Configure<JwtSettings>(jwtSection);

var jwtSettings = jwtSection.Get<JwtSettings>();

if (jwtSettings == null)
    throw new InvalidOperationException("Missing JwtSettings configuration");

var key = Encoding.ASCII.GetBytes(jwtSettings!.Secret);

// Auth + JWT
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,

        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,

        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),

        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

// DbContext
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Services
builder.Services.AddScoped<IUserService, UserService>();

// Pridani controlleru
builder.Services.AddControllers();

builder.WebHost.UseUrls("http://127.0.0.1:5043"); // pouze interní API (pro Nuxt)

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowNuxt", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseCors("AllowNuxt");

app.Use(async (context, next) =>
{
    if (context.Request.Path.StartsWithSegments("/api/internal") &&
        !System.Net.IPAddress.IsLoopback(context.Connection.RemoteIpAddress ?? System.Net.IPAddress.None))
    {
        context.Response.StatusCode = 403;
        await context.Response.WriteAsync("Access denied.");
        return;
    }

    await next();
});

//app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

// Mapovani controlleru
app.MapControllers();

app.Run();
