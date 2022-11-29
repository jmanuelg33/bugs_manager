using BugsManager.Context;

namespace BugsManager.Seeder;

public class Seeder
{
    private readonly AppDbContext _context;

    public Seeder(AppDbContext context)
    {
        _context = context;
    }

    public async Task Seed()
    {
        using (var trasaction = await _context.Database.BeginTransactionAsync())
        {
            try
            {
                await UserProjectSeed.Seed(_context);
                await trasaction.CommitAsync();
            }
            catch (System.Exception)
            {

            }
        }

    }
}