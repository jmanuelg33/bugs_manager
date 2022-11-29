using BugsManager.Context;
using BugsManager.Helpers;
using BugsManager.Repositories;
using BugsManager.Seeder;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration["ConnectionString:DefaultConnection"])
); // <=== add ContextDb

builder.Services.AddTransient<Seeder>(); // <== Seeder 
builder.Services.AddScoped<IBugRepository, BugRepository>(); // <== Repository

builder.Services.AddControllers()
       .AddNewtonsoftJson(); // <== include this for JsonResult format;

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

await SeedDataAsync(app); // <== Seed data method on startUp
async Task SeedDataAsync(IHost app)
{
    var scopedFactory = app.Services.GetService<IServiceScopeFactory>();
    if (scopedFactory != null)
    {
        using (var scope = scopedFactory.CreateScope())
        {
            var service = scope.ServiceProvider.GetService<Seeder>();
            if (service != null)
                await service.Seed();
        }
    }
}

app.UseCors(options =>
        options.AllowAnyOrigin()
               .AllowAnyHeader()
               .AllowAnyMethod()); // <== use CORS

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseMiddleware<ExceptionMiddleware>(); // <== custom midleware

app.MapControllers();

app.Run();
