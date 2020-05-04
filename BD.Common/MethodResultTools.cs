using System;
using System.Collections.Generic;
using System.Text;

namespace BD.Common
{
    public static class MethodResultTools
    {
        public static string GetDescription(this MethodResultLevel level)
        {
            switch (level)
            {
                case MethodResultLevel.OK:
                    return "OK";
                case MethodResultLevel.DAL:
                    return "DataBase error level";
                case MethodResultLevel.BL:
                    return "Buiseness logic error level";
                case MethodResultLevel.UI:
                    return "UI error level";
                case MethodResultLevel.Common:
                    return "Inner exception";
                case MethodResultLevel.Fatal:
                    return "Fatal error";
                case MethodResultLevel.CompetitiveAccess:
                    return "Competitive access error level";
                case MethodResultLevel.ExternalError:
                    return "External error level";
                case MethodResultLevel.Unknown:
                    return "Unknown error";
                default:
                    return (string)null;
            }
        }
    }
}
