using System.Reflection;
using TaskScheduler;

var taskTypes = Assembly.GetExecutingAssembly()
    .GetTypes()
    .Where(t => typeof(ITask).IsAssignableFrom(t) && !t.IsInterface && !t.IsAbstract)
    .Where(t => t.Namespace != null && t.Namespace.Contains("Tasks"))
    .ToList();

if (taskTypes.Count == 0)
{
    Console.WriteLine("Žádné tasky nebyly nalezeny ve složce 'Tasks'.");
    return;
}

while (true)
{
    Console.WriteLine("0. = konec");
    for (int i = 0; i < taskTypes.Count; i++)
    {
        var instance = (ITask)Activator.CreateInstance(taskTypes[i])!;
        Console.WriteLine($"{i + 1}. {instance.Name}");
    }
    
    if (!int.TryParse(Console.ReadLine(), out int index))
    {
        Console.WriteLine("Neplatný vstup.");
        continue;
    }

    if (index == 0)
    {
        break;
    }

    if (index > 0 && index <= taskTypes.Count)
    {
        var selected = (ITask)Activator.CreateInstance(taskTypes[index - 1])!;
        Console.WriteLine($"Spouštím: {selected.Name}");
        selected.Run();
    }
    else
    {
        Console.WriteLine("Neplatný výběr.");
    }
}
