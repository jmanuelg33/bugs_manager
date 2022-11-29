using Bogus;
using BugsManager.Context;
using BugsManager.Models;
using Microsoft.EntityFrameworkCore;

namespace BugsManager.Seeder;

public static class UserProjectSeed
{
    public static string Name = "User_Project";
    public static async Task Seed(AppDbContext _context)
    {
        if (await _context.SchemaSeeds.FirstOrDefaultAsync(u => u.Name == UserProjectSeed.Name) is null)
        {
            var users = new List<User>();
            var projects = new List<Project>();

            for (int i = 0; i < 5; i++)
            {
                var fakeUser = new Faker<User>()
                  .RuleFor(c => c.Name, f => f.Name.FirstName())
                  .RuleFor(c => c.Surname, f => f.Name.LastName());
                
                var fakeProject = new Faker<Project>()
                  .RuleFor(c => c.Name, f => $"Project-{i}");

                users.Add(fakeUser);
                projects.Add(fakeProject);
            }

            await _context.AddRangeAsync(users);
            await _context.AddRangeAsync(projects);
            await _context.SaveChangesAsync();

            await _context.SchemaSeeds.AddAsync(new SchemaSeed() { Name = UserProjectSeed.Name });
            await _context.SaveChangesAsync();
        }
    }
}