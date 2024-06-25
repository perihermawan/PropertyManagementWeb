using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Infrastructure;

namespace propertymanagement.web.Controllers
{
    public class BaseController : Controller
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            if (string.IsNullOrEmpty(HttpContext.Session.GetString(AppConstants.TokenSessionKey)))
            {
                Response.Redirect("/Authentication?status=sessionExpired");
            }
        }
    }
}