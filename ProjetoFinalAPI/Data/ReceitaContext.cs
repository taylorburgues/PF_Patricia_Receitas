using Microsoft.EntityFrameworkCore;
using ProjetoFinal_API.Models;
using System.Diagnostics.CodeAnalysis;

namespace ProjetoFinal_API.Data {

    public class ReceitaContext : DbContext {
        protected readonly IConfiguration Configuration;
        public ReceitaContext(IConfiguration configuration) {
            Configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder options) {
            // connect to sql server with connection string from app settings
            options.UseSqlServer(Configuration.GetConnectionString("StringConexaoSQLServer"));
        }

        public DbSet<Receita>? Receita { get; set; }
        public DbSet<User>? usuario { get; set; }
    }
}
