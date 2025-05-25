using Microsoft.EntityFrameworkCore;
using Data.Entities;

namespace Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }
    public DbSet<User> Users => Set<User>();
}