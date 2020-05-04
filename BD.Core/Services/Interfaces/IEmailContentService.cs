using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PIDG.Dtos;
using PIDG.Entities;

namespace PIDG.Services.Interfaces
{
    public interface IEmailContentService
    {
        string GetNewCallBodyContent(CallDTO call);
        string GetCanceledCallBodyContent(CallDTO call);
        string GetAssignedCallBodyContent(CallDTO call);
        string GetResolvedCallBodyContent(CallDTO call);
    }
}
