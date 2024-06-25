using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Infrastructure;
using propertymanagement.web.Models.Session;
using Newtonsoft.Json;

namespace propertymanagement.web.Session
{   
    public static class SessionManager
    {
        public static List<MenuSession> MenuSession
        {
            get
            {
                return AppContextStatic.Current.Session.GetString(AppConstants.SessionMenuKey) == null ? null : JsonConvert.DeserializeObject<List<MenuSession>>(AppContextStatic.Current.Session.GetString(AppConstants.SessionMenuKey));
            }
        }

        public static List<PermissionSession> PermissionSession
        {
            get
            {
                return AppContextStatic.Current.Session.GetString(AppConstants.SessionPermissionKey) == null ? null : JsonConvert.DeserializeObject<List<PermissionSession>>(AppContextStatic.Current.Session.GetString(AppConstants.SessionPermissionKey));
            }
        }

        public static int UserId { get { return Convert.ToInt32(AppContextStatic.Current.Session.GetString(AppConstants.UserId)); } }
        public static string Password { get { return AppContextStatic.Current.Session.GetString(AppConstants.Password); } }
    }
}
