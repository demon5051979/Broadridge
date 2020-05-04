using System;
using System.Collections.Generic;
using System.Text;

namespace BD.Common
{
    public enum MethodResultLevel
    {
        OK = 0,
        DAL = 1,
        BL = 2,
        UI = 3,
        Common = 4,
        Fatal = 5,
        CompetitiveAccess = 10, // 0x0000000A
        ExternalError = 11, // 0x0000000B
        ParseError = 12, // 0x0000000C
        Unknown = 100, // 0x00000064
    }
}
