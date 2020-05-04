using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.EntityFrameworkCore;
using BD.Data.Entities;

namespace BD.Data.DbContexts
{
    public class ApplicationContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Status> Statuses { get; set; }        
        public virtual DbSet<BTask> Tasks { get; set; }
        
        public ApplicationContext(DbContextOptions options) : base(options){}
    }
}
