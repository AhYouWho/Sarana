using Ecommerce_Back_End.Model.Data;
using Microsoft.EntityFrameworkCore;

namespace Ecommerce_Back_End
{
    public class EcommerceDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder opt)
        {
            opt.UseOracle("User Id = teababc; Password = 123; Data Source = (DESCRIPTION = (ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA = (SERVER = dedicated)(SID = xe)))");

        }
        public DbSet<Product> Product { get; set; }
        public DbSet<Cart> Cart { get; set; }
        public DbSet<Category> categories { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<ProductSpecification> ProductSpecifications { get; set; }
    }
}
