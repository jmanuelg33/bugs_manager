
namespace BugsManager.Models;

public class User
{

    public User()
    {
        Bugs = new HashSet<Bug>();
    }
    public Guid Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string Surname { get; set; } = String.Empty;

    public virtual ICollection<Bug> Bugs { get; set; }
}