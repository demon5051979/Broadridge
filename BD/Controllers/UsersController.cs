using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authorization;
using BD.Core.Services.Interfaces;
using BD.Core.Helpers;
using BD.Core.Dtos;
using BD.Common;

namespace BD.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : Controller
    {
        private IUserService _userService;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UsersController(
            IUserService userService,
            IMapper mapper,
            IOptions<AppSettings> appSettings)
        {
            _userService = userService;
            _mapper = mapper;
            _appSettings = appSettings.Value;
        }

        /// <summary>
        /// User authentication
        /// </summary>
        /// <param name="userDto"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("authenticate")]
        public MethodResult<UserDTO> Authenticate(UserDTO userDto)
        {
            try
            {
                if (string.IsNullOrEmpty(userDto.UserName))
                    throw new Exception("Username or password is incorrect");

                var user = _userService.Authenticate(userDto);

                if (user == null)
                    throw new Exception("Username or password is incorrect");

                return user.ToSuccessMethodResult();
            }
            catch (Exception ex)
            {
                return ex.ToErrorMethodResult<UserDTO>();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var user = _userService.GetById(id);
            return Ok(_mapper.Map<UserDTO>(user));
        }

    }
}