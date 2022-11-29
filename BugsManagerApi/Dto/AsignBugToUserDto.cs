using System.ComponentModel.DataAnnotations;

namespace BugsManager.Dto;

public class AsignBugToUserDto
{
    [Required]
    public Guid user_id { get; set; }
    [Required]
    public Guid project_id { get; set; }
    [Required]
    public string description { get; set; } = String.Empty;
}