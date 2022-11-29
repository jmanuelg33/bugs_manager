using Microsoft.EntityFrameworkCore;
using BugsManager.Models;

namespace BugsManager.Context
{
    public partial class AppDbContext : DbContext
    {

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<User> Users { get; set; } = null!;
        public virtual DbSet<Project> Projects { get; set; } = null!;
        public virtual DbSet<Bug> Bugs { get; set; } = null!;
        public virtual DbSet<SchemaSeed> SchemaSeeds { get; set; } = null!;
    }
}
