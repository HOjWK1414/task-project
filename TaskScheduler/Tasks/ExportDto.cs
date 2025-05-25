
using System.Reflection;
using NJsonSchema;
using NJsonSchema.CodeGeneration.TypeScript;

namespace TaskScheduler.Tasks;

// For LOCAL ONLY!
public class ExportDtoTask : ITask
{
    public string Name => "Export DTO (!! LOCAL ONLY !!)";

    public void Run()
    {
        var dataDllPath = Path.Combine(AppContext.BaseDirectory, @"..\..\..\..\Data\bin\Debug\net8.0\Data.dll");
        var dtoAssembly = Assembly.LoadFrom(dataDllPath);

        var dtoRootNamespace = "Data.Models.Dtos";
        var solutionRoot = Path.GetFullPath(Path.Combine(AppContext.BaseDirectory, @"..\..\..\.."));
        var outputRoot = Path.Combine(solutionRoot, "Nuxt", "Models", "AppDtos");

        if (Directory.Exists(outputRoot))
            Directory.Delete(outputRoot, recursive: true);

        Directory.CreateDirectory(outputRoot);

        foreach (var type in dtoAssembly.GetTypes())
        {
            if (!type.IsClass || type.Namespace == null || !type.Namespace.StartsWith(dtoRootNamespace))
                continue;

            var exclude = type.CustomAttributes.Any(a =>
                a.AttributeType.Name == "ExcludeFromTypeScriptAttribute");
            if (exclude) continue;

            var relativeNamespace = type.Namespace![dtoRootNamespace.Length..].TrimStart('.');
            var outputDir = Path.Combine(
                outputRoot,
                string.Join(Path.DirectorySeparatorChar,
                    relativeNamespace
                        .Split('.')
                        .Select(ToKebabCase))
            );

            Directory.CreateDirectory(outputDir);

            var schema = JsonSchema.FromType(type);
            var generator = new TypeScriptGenerator(schema, new TypeScriptGeneratorSettings
            {
                TypeStyle = TypeScriptTypeStyle.Interface,
                GenerateConstructorInterface = true
            });

            var tsCode = generator.GenerateFile(type.Name);
            var fileName = ToCamelCase(type.Name) + ".ts";
            var filePath = Path.Combine(outputDir, fileName);

            File.WriteAllText(filePath, tsCode);
            Console.WriteLine($" Generated: {filePath}");
        }
    }

    private static string ToKebabCase(string input)
    {
        return string.Concat(
            input.Select((x, i) =>
                i > 0 && char.IsUpper(x) ? "-" + char.ToLower(x) : char.ToLower(x).ToString()
            )
        );
    }

    private static string ToCamelCase(string input)
    {
        if (string.IsNullOrEmpty(input) || input.Length < 2)
            return input.ToLower();

        return char.ToLowerInvariant(input[0]) + input.Substring(1);
    }

}