using AutoMapper;
using BD.Core.Dtos;
using BD.Data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Presentation;

namespace BD.Core.Helpers
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<BTask, TaskDTO>();
            CreateMap<TaskDTO, BTask>();
            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();
            CreateMap<Status, StatusDTO>();
            CreateMap<StatusDTO, Status>();
        }
    }
}
