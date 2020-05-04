using AutoMapper;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using BD.Common;
using BD.Core.Dtos;
using BD.Core.Helpers;
using BD.Core.Services.Interfaces;
using BD.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BD.Data.Repositories;

namespace BD.Core.Services
{
    public class RepoService : IRepoService
    {    
        IBTaskRepository _taskRepository;
        IMapper _mapper;
        ICurrentUserService _currentUserService;
        private readonly AppSettings _appSettings;
        public RepoService(IOptions<AppSettings> appSettings, IBTaskRepository applicationEFRepository, IMapper mapper, ICurrentUserService currentUserService)
        {
            _mapper = mapper;
            _taskRepository = applicationEFRepository;
            _currentUserService = currentUserService;
            _appSettings = appSettings.Value;
        }
        public async Task<BTask> Save(TaskDTO task)
        {
            task.CreateDate = DateTime.Now;
            var result = await _taskRepository.Save(_mapper.Map<BTask>(task));
            return result;
        }

        public async Task<IEnumerable<TaskDTO>> GetAll(int statusId)
        {
            var tasks = await _taskRepository.GetAll(statusId);

            return tasks.Select(t => new TaskDTO()
            {
                Id = t.Id,
                UserID = t.UserId,
                StatusId = t.StatusId,
                CreateDate = t.CreateDate,
                Deadline = t.Deadline,
                TimeToComplete = Convert.ToInt64((t.Deadline - DateTime.Now).TotalSeconds),
                Name = t.Name,
                Description = t.Description,
                Priority = t.Priority,
                UserName = t.Users.UserName,
                StatusName = t.Statuses.Name
            });            
        }

        public async Task<IEnumerable<TaskDTO>> GetTasksPagination(int statusId, int pageNumber)
        {
            var tasks = await _taskRepository.GetTasksPagination(statusId, pageNumber);

            return tasks.Select(t => new TaskDTO()
            {
                Id = t.Id,
                UserID = t.UserId,
                StatusId = t.StatusId,
                CreateDate = t.CreateDate,
                Deadline = t.Deadline,
                TimeToComplete = Convert.ToInt64((t.Deadline - DateTime.Now).TotalSeconds),
                Name = t.Name,
                Description = t.Description,
                Priority = t.Priority,
                UserName = t.Users.UserName,
                StatusName = t.Statuses.Name
            });
        }

        public async Task<TaskDTO> GetById(Guid Id)
        {
            var result =  await _taskRepository.GetById(Id);
            var mappedResult = _mapper.Map<TaskDTO>(result);
            return mappedResult;
        }

        public async Task<bool> ChangeStatus(TaskDTO task)
        {
            await _taskRepository.ChangeStatus(_mapper.Map<BTask>(task));
            return true;
        }
    }
}
