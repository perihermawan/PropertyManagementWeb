using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;

namespace propertymanagement.web.Common
{
    public static class ApiUrl
    {
        //private static clsCommon common = new clsCommon();
        public static string APIUrl
        {

            get
            {
                var url = clsCommon.Configuration.AppConfiguration.dataurl;
                if (url.EndsWith("/"))
                    return url.Substring(0, url.Length - 1);
                return url;
            }
        }
    }
}
