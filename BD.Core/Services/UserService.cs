using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using BD.Core.Services.Interfaces;
using BD.Core.Dtos;
using Microsoft.IdentityModel.Tokens;
using BD.Data.DbContexts;
using BD.Data.Entities;
using BD.Core.Helpers;
using AutoMapper;
using Microsoft.Graph;
using System.Threading.Tasks;
using Microsoft.Identity.Client;
using System.Net.Http.Headers;

namespace BD.Core.Services
{
    public class UserService : IUserService
    {
        private ApplicationContext _context;
        private IMapper _mapper;
        private readonly AppSettings _appSettings;

        public UserService(ApplicationContext context, IOptions<AppSettings> appSettings, IMapper mapper)
        {
            _context = context;
            _appSettings = appSettings.Value;
            _mapper = mapper;
        }

        public UserDTO GetById(int id)
        {
            return _mapper.Map<UserDTO>(_context.Users.Find(id));
        }

        /// <summary>
        /// Authenticate after Azure AD 
        /// </summary>
        /// <param name="userDTO"></param>
        /// <returns></returns>
        public UserDTO Authenticate(UserDTO userDTO)
        {

            var user = _context.Users.AsNoTracking().SingleOrDefault(x => x.UserName == userDTO.UserName);

            if (user == null)
            {
                return null;
            }
            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("Id", user.Id.ToString()),
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email ?? user.UserName)
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // authentication successful
            UserDTO userMapped = new UserDTO()
            {
                Id = user.Id,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Token = user.Token                
            };

            return userMapped;
        }
    }
}
