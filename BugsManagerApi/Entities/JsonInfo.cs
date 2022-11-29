namespace BugsManager.Entities;

public class JsonInfo<T> 
{
    public string status { get; set; } = String.Empty;
    public T? data { get; set; }
}