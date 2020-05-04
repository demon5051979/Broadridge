using AutoMapper;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using BD.Core.Helpers;
using BD.Core.Services;
using BD.Core.Services.Interfaces;
using BD.Data.DbContexts;
using BD.Data.Entities;
using BD.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace BD.Core.Extentions.ServiceRegistration
{
    public static class ServiceCollectionExtention
    {
        public static void AddRepositories(this IServiceCollection collection, string connectionString)
        {
            collection.AddDbContext<ApplicationContext>(options =>
            {
                //uncomment to enable lazy-loading
                //options.UseLazyLoadingProxies();
                options.UseSqlServer(connectionString);
            });
            collection.AddTransient<IBTaskRepository, BTaskRepository>();
        }
        public static void AddServices(this IServiceCollection collection)
        {
            collection.AddTransient<IUserService, UserService>(x => new UserService(
                collection.BuildServiceProvider().GetRequiredService<ApplicationContext>(),
                collection.BuildServiceProvider().GetRequiredService<IOptions<AppSettings>>(),
                collection.BuildServiceProvider().GetRequiredService<IMapper>()));

            collection.AddTransient<IRepoService, RepoService>(x => new RepoService(
                collection.BuildServiceProvider().GetRequiredService<IOptions<AppSettings>>(),
                collection.BuildServiceProvider().GetService<IBTaskRepository>(),
                collection.BuildServiceProvider().GetRequiredService<IMapper>(),
                collection.BuildServiceProvider().GetRequiredService<ICurrentUserService>()));
        }

        public static void JwtBearerOptionsSettings(this JwtBearerOptions jwt, byte[] key)
        {
            jwt.Events = new JwtBearerEvents
            {
                OnTokenValidated = context =>
                {
                    var userService = context.HttpContext.RequestServices.GetRequiredService<IUserService>();
                    var userId = context.Principal.Identity.Name;
                    var user = userService.GetById(Convert.ToInt32(userId));
                    if (user == null)
                    {
                        context.Fail("Unauthorized");
                    }
                    return Task.CompletedTask;
                }
            };
            jwt.RequireHttpsMetadata = false;
            jwt.SaveToken = true;
            jwt.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true,
                ClockSkew = TimeSpan.Zero
            };
        }
    }
}
