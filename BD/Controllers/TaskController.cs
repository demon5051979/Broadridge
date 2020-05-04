using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using BD.Common;
using BD.Core.Dtos;
using BD.Core.Helpers;
using BD.Core.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BD.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        IRepoService _repoService;

        public TaskController(IRepoService repoService)
        {
            _repoService = repoService;
        }

        /// <summary>
        /// Save/Update task to database
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<MethodResult<Data.Entities.BTask>> SaveTask(TaskDTO task)
        {
            try
            {
                var result = await _repoService.Save(task);
                return result.ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                return ex.ToErrorMethodResult<Data.Entities.BTask>();
            }   
        }

        /// <summary>
        /// Get all tasks
        /// </summary>
        /// <param name="statusId"></param>
        /// <returns></returns>
        [HttpGet("[action]/{statusId}")]
        public async Task<MethodResult<IEnumerable<TaskDTO>>> GetAll(int statusId)
        {
            try
            {
                IEnumerable<TaskDTO>  result = await _repoService.GetAll(statusId);
                return result.ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                return ex.ToErrorMethodResult<IEnumerable<TaskDTO>>();
            }
        }

        /// <summary>
        /// Get tasks with pagination
        /// </summary>
        /// <param name="statusId"></param>
        /// <param name="pageNumber"></param>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<MethodResult<IEnumerable<TaskDTO>>> GetTasksPagination(PaginationInfo info)
        {
            try
            {
                IEnumerable<TaskDTO> result = await _repoService.GetTasksPagination(info.StatusId, info.PageNumber);
                return result.ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                return ex.ToErrorMethodResult<IEnumerable<TaskDTO>>();
            }
        }

        /// <summary>
        /// Change task status
        /// </summary>
        /// <returns></returns>
        [HttpPost("[action]")]
        public async Task<MethodResult<bool>> ChangeStatus(TaskDTO task)
        {
            try
            {
                return (await _repoService.ChangeStatus(task)).ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                return ex.ToErrorMethodResult<bool>();
            }
        }
    }
}