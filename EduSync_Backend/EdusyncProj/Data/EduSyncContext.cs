using EduSync.Models;
using Microsoft.EntityFrameworkCore;

namespace EduSync.Data
{
    public class EduSyncContext : DbContext
    {
        public EduSyncContext(DbContextOptions<EduSyncContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<QuizResult> Results { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<QuizResult>()
                .Property(r => r.AnswersJson)
                .HasColumnType("nvarchar(max)");
        }
    }
}
