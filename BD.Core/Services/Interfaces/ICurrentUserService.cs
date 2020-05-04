using System;
using System.Collections.Generic;
using System.Text;

namespace BD.Core.Services.Interfaces
{
    public interface ICurrentUserService
    {
        string UserId { get; }
        string UserName { get; }
        string RoleName { get; }
        string Email { get; }
    }
}
