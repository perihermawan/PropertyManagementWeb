using System;
using System.Collections.Generic;
using System.Text;

namespace propertymanagement.web.ServiceAPI
{
    public class ApiException : Exception
    {
        public ApiException(string message)
        : base(message)
        {

        }
        public System.Net.HttpStatusCode StatusCode { get; set; }
        public string Status { get; set; }
    }
}
