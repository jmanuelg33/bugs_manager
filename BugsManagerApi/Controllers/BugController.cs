using BugsManager.Dto;
using BugsManager.Entities;
using BugsManager.Models;
using BugsManager.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace BugsManager.Controller;

[ApiController]
[Route("api/v1")]
[Produces("application/json")]
public class BugController : ControllerBase
{
    private readonly IBugRepository _bugRepository;
    public BugController(IBugRepository bugRepository)
    {
        _bugRepository = bugRepository;
    }

    [HttpPost("bug")]
    public async Task<ActionResult<JsonInfo<Guid>>> Asign([FromBody] AsignBugToUserDto request)
    {
        return Ok(
            new JsonInfo<Guid>
            {
                status = "success",
                data = (Guid)await _bugRepository.AsignToUser(request)
            }
        );
    }

    [HttpGet("bugs")]
    public async Task<ActionResult> GetBugs([FromQuery] FilterbugDto request)
    {
        List<object> bugs = await _bugRepository.Bugs(request);

        if (bugs.Count == 0)
        {
            throw new Exceptions.InvalidFiltersException("Invalid filters");
        }

        return Ok(
            new JsonInfo<List<object>>
            {
                status = "success",
                data = bugs
            }
        );
    }

    [HttpGet("summary")]
    public async Task<ActionResult> ProjectSummary()
    {
        return Ok(
            new JsonInfo<List<object>>
            {
                status = "success",
                data = await _bugRepository.ProjectSummary()
            }
        );
    }

    [HttpGet("users")]
    public async Task<ActionResult> GetUsers()
    {
        return Ok(
            new JsonInfo<List<object>>
            {
                status = "success",
                data = await _bugRepository.GetAllUsers()
            }
        );
    }

    [HttpGet("projects")]
    public async Task<ActionResult> GetProjects()
    {
        return Ok(
            new JsonInfo<List<object>>
            {
                status = "success",
                data = await _bugRepository.GetAllProjects()
            }
        );
    }
}