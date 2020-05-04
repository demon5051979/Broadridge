using BD.Data.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BD.Data.Repositories
{
	public interface IBTaskRepository
	{

        Task<BTask> GetById(Guid Id);
        Task<IEnumerable<BTask>> GetAll(int statusId);
        Task<BTask> Save(BTask task);
        Task ChangeStatus(BTask task);
        Task<IEnumerable<BTask>> GetTasksPagination(int statusId, int pageNumber);
    }
}
