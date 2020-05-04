using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BD.Data.Entities;
using BD.Data.DbContexts;
using JW;

namespace BD.Data.Repositories
{

    public class BTaskRepository : IBTaskRepository
    {
        private readonly ApplicationContext _dbContext;
        private readonly int pageSize = 20;

        public BTaskRepository(ApplicationContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<BTask> GetById(Guid Id)
        {
            return await _dbContext.Tasks.
                AsNoTracking().
                Include(x => x.Statuses).                
                FirstOrDefaultAsync(x => x.Id == Id);
        }

        public async Task<IEnumerable<BTask>> GetAll(int statusId)
        {
            var result = _dbContext.Tasks.
                AsNoTracking().
                Include(x => x.Statuses).
                Include(x => x.Users).
                Where(x => x.StatusId == statusId || statusId < 0 ).
                OrderByDescending(x => x.CreateDate);

            return result;
        }

        public async Task<IEnumerable<BTask>> GetTasksPagination(int statusId, int pageNumber)
        {
            var collectionSize = _dbContext.Tasks.AsNoTracking().Where(x => x.StatusId == statusId || statusId < 0).Count();

            var pager = new Pager(totalItems: collectionSize, currentPage: pageNumber, pageSize: pageSize);


            var result = _dbContext.Tasks.
                AsNoTracking().
                Include(x => x.Statuses).
                Include(x => x.Users).
                Where(x => x.StatusId == statusId || statusId < 0).
                OrderByDescending(x => x.CreateDate).
                Skip(pager.StartIndex).Take(pager.PageSize);

            return result;
        }

        public async Task<BTask> Save(BTask task)
        {
            if (_dbContext.Tasks.AsNoTracking().Any(x => x.Id == task.Id))
            {
                _dbContext.Entry(task).State = EntityState.Modified;
                await _dbContext.SaveChangesAsync();
                _dbContext.Entry(task).State = EntityState.Detached;

                var extask = _dbContext.Tasks
                  .Where(p => p.Id == task.Id)
                  .Include(p => p.Statuses)
                  .FirstOrDefault();
                await _dbContext.SaveChangesAsync();
                return extask;
            }
            else
            {
                _dbContext.Tasks.Add(task);
                await _dbContext.SaveChangesAsync();
                return task;
            }
        }

        public async Task ChangeStatus(BTask task)
        {
            var editTask = await _dbContext.Tasks.AsNoTracking().FirstOrDefaultAsync(x => x.Id == task.Id);
            if (editTask == null)
            {
                throw new Exception($"Таsk {task.Id} not found");
            }
            _dbContext.Entry(editTask).State = EntityState.Modified;
            editTask.StatusId = task.StatusId;
            await _dbContext.SaveChangesAsync();
        }
    }
}
