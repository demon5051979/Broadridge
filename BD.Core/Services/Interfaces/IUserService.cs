using BD.Core.Dtos;
using BD.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BD.Core.Services.Interfaces
{
    public interface IUserService
    {
        UserDTO Authenticate(UserDTO user);

        UserDTO GetById(int id);
    }
}
