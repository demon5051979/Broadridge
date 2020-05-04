using BD.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BD.Core.Dtos
{
    public class TaskDTO
    {
        public Guid Id { get; set; }
        public int UserID { get; set; }
        public string UserName { get; set; }
        public DateTime CreateDate { get; set; }
        public DateTime Deadline { get; set; }
        public long TimeToComplete { get; set; }
        public string TimeToCompleteString { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int Priority { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
    }
}
