using System.Linq.Expressions;
using BugsManager.Dto;
using BugsManager.Models;

namespace BugsManager.Repositories;

public interface IBugRepository
{
    Task<List<object>> Bugs(FilterbugDto param);
    Task<List<object>> GetAllUsers();
    Task<List<object>> GetAllProjects();
    Task<Guid?> AsignToUser(AsignBugToUserDto param);
    Task<List<object>> ProjectSummary();
    Task<List<Bug>> SearchBugDAO(Expression<Func<Bug, bool>> predicate);
    Task<Guid> AddBugDAO(Bug bug);
}