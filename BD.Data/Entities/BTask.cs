using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BD.Data.Entities
{
    public class BTask
    {
        public Guid Id { get; set; }
        public int UserId { get; set; }
        public int StatusId { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime Deadline { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public virtual Status Statuses { get; set; }
        public virtual User Users { get; set; }
    }
}