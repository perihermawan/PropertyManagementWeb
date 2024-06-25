using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using propertymanagement.web.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using propertymanagement.web.Common;
using Serilog;
using Microsoft.Extensions.Logging;

namespace propertymanagement.web.Controllers
{
    public class UserAccessController : Controller
    {
        #region Depenency
        ILogger<UserInfoController> logger;
        #endregion

        #region Entity
        string url = ApiUrl.APIUrl;
        #endregion

        #region Constructor

        #endregion

        #region View
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {
            return View();
        }
        #endregion

        #region Function
       
        #endregion

    }
}