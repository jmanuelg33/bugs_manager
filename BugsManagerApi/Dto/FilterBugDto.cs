using System.ComponentModel.DataAnnotations;
using BugsManager.Helpers;

namespace BugsManager.Dto;


[AtLeastOneProperty("user_id", "project_id", "start_date", "end_date", ErrorMessage="You must supply at least one value")]
public class FilterbugDto
{
    public Guid? project_id { get; set; }
    public Guid? user_id { get; set; }
    public DateTime? start_date { get; set; }
    public DateTime? end_date { get; set; }
}
