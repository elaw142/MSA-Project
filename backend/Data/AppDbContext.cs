using Microsoft.EntityFrameworkCore;
using backend.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Recipe>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Title).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.Description).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.Ingredients).IsRequired().HasColumnType("TEXT");
                entity.Property(e => e.Instructions).IsRequired().HasColumnType("TEXT");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
