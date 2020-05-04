using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BD.Core.Helpers
{
    public class AppSettings
    {
        public string ClientId { get; set; }
        public string RedirectUri { get; set; }
        public string Tenant { get; set; }
        public string Secret { get; set; }
    }
}
