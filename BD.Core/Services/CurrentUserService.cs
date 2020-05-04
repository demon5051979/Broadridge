using Microsoft.AspNetCore.Http;
using BD.Core.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace BD.Core.Services
{
    public class CurrentUserService : ICurrentUserService
    {
        public CurrentUserService(IHttpContextAccessor httpContextAccessor)
        {
            Email = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Email);
            RoleName = httpContextAccessor.HttpContext?.User?.FindFirstValue(ClaimTypes.Role);
            UserId = httpContextAccessor.HttpContext?.User?.FindFirstValue("Id");
            UserName = httpContextAccessor.HttpContext?.User?.Identity?.Name;
        }

        public string UserId { get; }

        public string RoleName { get; }

        public string Email { get; }

        public string UserName { get; }
    }
}
