using BugsManager.Context;
using BugsManager.Dto;
using BugsManager.Models;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;

namespace BugsManager.Repositories;

public class BugRepository : IBugRepository
{
    private readonly AppDbContext _context;
    public BugRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> AsignToUser(AsignBugToUserDto param)
    {
        await validateUserId(param.user_id);
        await validateProjectId(param.project_id);

        return await AddBugDAO(new Bug()
        {
            ProjectId = param.project_id,
            UserId = param.user_id,
            Description = param.description
        });
    }

    public async Task<List<object>> Bugs(FilterbugDto param)
    {
        if (param.user_id != null)
        {
            await validateUserId((Guid)param.user_id);
        }

        if (param.project_id != null)
        {
            await validateProjectId((Guid)param.project_id);
        }

        List<Bug> bugs = await SearchBugDAO(
            u => param.user_id != null ? u.UserId == param.user_id : true
            && param.project_id != null ? u.ProjectId == param.project_id : true
            && param.start_date != null ? u.CreationDate >= param.start_date : true
            && param.end_date != null ? u.CreationDate <= param.end_date : true
            );

        var result = (from u in bugs
                      select BugsInfo(u)).ToList();

        return result;
    }

    public async Task<List<object>> ProjectSummary()
    {
        var query = (from u in _context.Projects.Include(u => u.Bugs).AsNoTracking()
                     select new
                     {
                         project_id = u.Id,
                         project_name = u.Name,
                         bugs = u.Bugs.Count
                     });

        return await query.ToListAsync<object>();
    }

    public async Task<List<object>> GetAllUsers()
    {
        var query = (from u in _context.Users
                     select new
                     {
                         id = u.Id,
                         fullname = $"{u.Name} {u.Surname}"
                     });

        return await query.ToListAsync<object>();
    }

    public async Task<List<object>> GetAllProjects()
    {
        var query = (from u in _context.Projects
                     select new
                     {
                         id = u.Id,
                         name = u.Name
                     });

        return await query.ToListAsync<object>();
    }

    // Data Access Object
    public async Task<Guid> AddBugDAO(Bug bug)
    {
        await _context.AddAsync(bug);
        await _context.SaveChangesAsync();

        return bug.Id;
    }

    public async Task<List<Bug>> SearchBugDAO(Expression<Func<Bug, bool>> predicate)
    {
        return await _context.Bugs
            .Include(u => u.Project)
            .Include(u => u.User)
            .AsNoTracking()
            .Where(predicate)
            .ToListAsync();
    }

    private object BugsInfo(Bug bug)
    {
        return new
        {
            id = bug.Id,
            description = bug.Description,
            username = $"{bug.User.Name} {bug.User.Surname}",
            project = bug.Project.Name,
            creation_date = bug.CreationDate
        };
    }

    private async Task validateUserId(Guid userId)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == userId);

        if (user is null)
        {
            throw new Exceptions.InvalidUserException("Invalid user ID");
        }
    }

    private async Task validateProjectId(Guid projectId)
    {
        var project = await _context.Projects.FirstOrDefaultAsync(u => u.Id == projectId);

        if (project is null)
        {
            throw new Exceptions.InvalidProjectException("Invalid project ID");
        }
    }
}
