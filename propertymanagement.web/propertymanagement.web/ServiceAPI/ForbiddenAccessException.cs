using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace propertymanagement.web.ServiceAPI
{
    public class ForbiddenAccessException : Exception
    {
        public ForbiddenAccessException()
            :base("You are not authorized to access this action.")
        {

        }

        public ForbiddenAccessException(string message)
            :base(message)
        {
            
        }

        public string Status => "Forbidden";
        public int StatusCode => StatusCodes.Status403Forbidden; //(int)HttpStatusCode.Forbidden;
    }
}
