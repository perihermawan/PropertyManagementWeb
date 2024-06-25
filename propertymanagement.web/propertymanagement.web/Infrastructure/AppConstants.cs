using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Infrastructure
{
    public static class AppConstants
    {
        public const string SessionUserKey = "AppUserSession";
        public const string SessionMenuKey = "AppMenuSession";
        public const string SessionPermissionKey = "AppPermissionSession";
        public const string TokenSessionKey = "AppTokenSession";
        public const string NoRecordsText = "No records yet";
        public const string UserId = "UserId";
        public const string Password = "Password";
        //public const string TokenSessionKey = "TokenSessionKey";
        public const string NIK = "NIK";
        public const string Email = "Email";
        public const string Fullname = "Fullname";

        public class CoreRoles
        {
            public const string DefaultUser = "DEFAULT_USER";
            public const string Administrator = "ADMINISTRATOR";
        }

        public class CoreEntity
        {
            public const string DefaultUser = "DEFAULT_USER";
            public const string PHM = "PHM";
        }
    }
}
