using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIDG.Dtos;
using PIDG.Entities;

namespace PIDG.Core.Services.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendEmailAsync(string from, string subject, string body, bool isHtml = true, params string[] recepientEmails);
    }
}
