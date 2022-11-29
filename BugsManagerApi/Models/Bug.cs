using System.ComponentModel.DataAnnotations;

namespace BugsManager.Models;
public class Bug
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public virtual User User { get; set; } = null!;
    public Guid ProjectId { get; set; }
    public virtual Project Project { get; set; } = null!;
    [MaxLength(100)]
    [Required]
    public string Description { get; set; } = String.Empty;
    public DateTime? CreationDate { get; set; } = DateTime.UtcNow;

}