
using Microsoft.EntityFrameworkCore;

namespace BugsManager.Models;

[Index(nameof(Name), IsUnique=true)]
public class Project
{
    public Project()
    {
        Bugs = new HashSet<Bug>();
    }
    public Guid Id { get; set; }
    public string Name { get; set; } = String.Empty;
    public string? Description { get; set; } = String.Empty;
    public virtual ICollection<Bug> Bugs { get; set; }
}