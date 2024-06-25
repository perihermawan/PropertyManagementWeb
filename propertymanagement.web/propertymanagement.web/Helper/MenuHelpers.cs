using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using propertymanagement.web.Cache;
using propertymanagement.web.Models.Master;
using propertymanagement.web.Session;
using propertymanagement.web.Models.Partial;
using Microsoft.AspNetCore.Html;
using propertymanagement.web.Infrastructure.Navigation;
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Infrastructure;

namespace propertymanagement.web
{
    public static class MenuHelpers
    {
        public static HtmlString Sidebar()
        {
            try
            {
                var UserFormPermissions = SessionManager.PermissionSession;
                var menus = SessionManager.MenuSession;

                var userid = SessionManager.UserId;

                var menuBuilder = new MenuBuilder(UserFormPermissions, userid, menus, AppContextStatic.Current);

                return menuBuilder.Render();
            }
            catch (Exception)
            {
                AppContextStatic.Current.Response.Redirect("/Authentication/Logout");
            }

            return null;
        }
    }
}
