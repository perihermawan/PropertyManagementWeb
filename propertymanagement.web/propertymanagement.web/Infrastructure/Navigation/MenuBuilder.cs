using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Http.Extensions;
//using System.Web.Mvc;
using propertymanagement.web.Models.Partial;
using propertymanagement.web.Models.Session;
using propertymanagement.web.Models.Master;
using Microsoft.AspNetCore.Mvc;

namespace propertymanagement.web.Infrastructure.Navigation
{
    public class MenuBuilder
    {
        private IEnumerable<PermissionSession> _acl;
        private int _actors;
        private IEnumerable<MenuSession> _menus;
        //private IEnumerable<string> _role;
        private HttpContext _context;
        private readonly Dictionary<Guid, MenuSession> _selectedMenus = new Dictionary<Guid, MenuSession>();

        public MenuBuilder(IEnumerable<PermissionSession> acl, int actors,//, IEnumerable<string> role
             IEnumerable<MenuSession> menus, HttpContext context)
        {
            _acl = acl;
            _actors = actors;
            //_role = role;
            _menus = menus;
            _context = context;
        }

        public HtmlString Render()
        {
            //HttpContext context;
            DeepSelect(_context.Request.GetDisplayUrl());

            var sb = new StringBuilder();

            var roots = _menus.Where(x => x.ParentID == null).OrderBy(x => x.OrderIndex);

            sb.Append(@"<ul class=""page-sidebar-menu  page-header-fixed "" data-keep-expanded=""false"" data-auto-scroll=""true"" data-slide-speed=""200"">");
            foreach (var root in roots)
            {
                sb.Append(Render(root));
            }
            sb.Append("</ul>");

            return new HtmlString(sb.ToString());
        }

        private string Render(MenuSession menu)
        {
            var selected = _selectedMenus.ContainsKey(menu.ID);
            var sb = new StringBuilder();
            var childs = _menus.Where(x => x.ParentID == menu.ID).OrderBy(x => x.OrderIndex);
            //var hasChild = childs.Count(x => x.Visible == 1 && _actors.Any(y => _acl.Any(z => z.Rolename == y && z.PermissionName == menu.PermissionName))) > 0;
            var hasChild = childs.Count(x => x.Visible == 1 && _acl.Any(y => y.UserId == _actors && y.ID == menu.PermissionID)) > 0;

            if (!_acl.Any(y => y.UserId == _actors && y.ID == menu.PermissionID) || menu.Visible != 1) return sb.ToString();

            if (hasChild)
            {
                sb.Append(string.Format(@"<li class=""kt-menu__item  kt-menu__item--submenu {0}"" aria-haspopup=""true"" data-ktmenu-submenu-toggle=""hover"">", selected ? " active open" : string.Empty));
            }
            else
            {
                sb.Append(string.Format(@"<li class=""nav-item"" aria-haspopup=""true"">", selected ? " active open" : string.Empty));
            }
            if (!hasChild)
            {
                sb.Append(string.Format(@"<a href=""{0}"" class=""nav-link"">", !string.IsNullOrEmpty(menu.Url) && !menu.Url.Contains("#") ? menu.Url : "javascript:;", hasChild ? "kt-menu__toggle" : string.Empty));

                sb.Append(string.Format(@"<i class=""kt-menu__link-icon  {0}""></i>", menu.IconClass));
                sb.Append(string.Format(@"&nbsp;&nbsp;<span class=""title"">{0}</span>", menu.Title));
            }
                

            if (hasChild)
            {
                sb.Append(string.Format(@"<i class=""{0}""></i>", selected ? "kt-menu__ver-arrow la la-angle-down" : "kt-menu__ver-arrow la la-angle-right"));
                sb.Append(string.Format(@"<span class=""arrow {0}""></span>", selected ? "open" : string.Empty));
            }

            if (selected)
                sb.Append(@"<span class=""selected""></span>");

            sb.Append("</a>");

            if (hasChild)
            {
                //sb.Append(@"<div class=""kt-menu__submenu "">");
                
                sb.Append(string.Format(@"<li class=""nav-item""><a href=""javascript:;"" class=""nav-link nav-toggle"" target=""_top""><i class=""icon-settings""></i><span class=""title"">{0}</span><span class=""selected""></span><span class=""arrow""></span></a>", menu.Title));
                sb.Append(@"<ul class=""sub-menu"">");
                foreach (var child in childs)
                {
                    sb.Append(Render(child));
                }
                sb.Append("</ul></li>");
                //sb.Append("</div>");
            }

            sb.Append(@"</li>");


            return sb.ToString();
        }

        private string GetAbsoluteUrl(string url)
        {
            if (!string.IsNullOrEmpty(url))
                return string.Format("{0}://{1}{2}{3}", _context.Request.Scheme, _context.Request.Host, _context.Request.Path, _context.Request.QueryString);

            return url;
        }
        private void DeepSelect(string uri)
        {
            var menu = _menus.FirstOrDefault(x => GetAbsoluteUrl(x.Url) == uri);

            if (menu == null) return;

            while (menu != null)
            {
                _selectedMenus.Add(menu.ID, menu);

                menu = _menus.FirstOrDefault(x => x.ID == menu.ParentID);
            }
        }
    }
}
