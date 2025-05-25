
namespace TaskScheduler;

public interface ITask
{
    string Name { get; }
    void Run();
}
