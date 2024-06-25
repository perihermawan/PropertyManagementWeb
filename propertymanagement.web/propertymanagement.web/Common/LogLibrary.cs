using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for LogLibrary
/// </summary>
///
namespace propertymanagement.web.Common
{
    public static class LogLibrary
    {
        public static string Logging(string Status, string Function, string UserName, string Parameter, string Message, string Result)
        {
            if (Status == "S")
            {
                Status = "START";
            }
            else if (Status == "E")
            {
                Status = "END";
            }
            return Status + " - " + Function + " \n\t\t Username: " + UserName + " \n\t\t Parameter: " + Parameter + " \n\t\t Message: " + Message + " \n\t\t Result: " + Result;
        }

        public static string Logging_Debug_Start(string Function, string URLAPI, string Parameter, string UserName)
        {
            return "Start - " + Function + " \n\t\t URL API: " + URLAPI + " \n\t\t Parameter: " + Parameter + " \n\t\t Username: " + UserName;
        }

        public static string Logging_Debug_End(string Function, string URLAPI, string UserName, string Parameter, string Message, string Result)
        {
            return "END - " + Function + " \n\t\t URL API: " + URLAPI + " \n\t\t Username: " + UserName + " \n\t\t Parameter: " + Parameter + " \n\t\t Message: " + Message + " \n\t\t Result: " + Result;
        }

        public static string Error(string Function, string UserName, string Message)
        {
            return Function + " \n\t\t Username: " + UserName + " \n\t\t Message: " + Message;
        }





    }
}
