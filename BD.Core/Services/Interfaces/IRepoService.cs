using BD.Core.Dtos;
using BD.Core.Helpers;
using BD.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BD.Core.Services.Interfaces
{
    public interface IRepoService
    {
        Task<IEnumerable<TaskDTO>> GetAll(int statusId);
        Task<TaskDTO> GetById(Guid Id);
        Task<BTask> Save(TaskDTO app);
        Task<bool> ChangeStatus(TaskDTO task);
        Task<IEnumerable<TaskDTO>> GetTasksPagination(int statusId, int pageNumber);
    }
}
