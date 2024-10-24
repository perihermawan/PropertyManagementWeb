using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using propertymanagement.web.Models.Master;
using propertymanagement.web.Models.ViewModels;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using propertymanagement.web.Common;
using Serilog;
using Microsoft.Extensions.Logging;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Infrastructure;
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Cache;

namespace propertymanagement.web.Controllers
{
    public class AuthenticationController : Controller
    {
        ILogger<UserInfoController> logger;
        //private readonly ILogger<UserInfoController> _logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public AuthenticationController(ApiClientFactory client, ILogger<UserInfoController> logger)
        {
            this.logger = logger;
            this._client = client;
        }
        //public static void SetHttpContextAccessor(IHttpContextAccessor accessor)
        //{
        //    Accessor = accessor;
        //}
        public IActionResult Index()
        {
            return View();
        }

        public void Logout()
        {
            HttpContext.Session.Clear();
            Response.Redirect("/Authentication?status=Logout");
        }

        public JsonResult GetUserLogin()
        {
            var datas = new
            {
                fullname = HttpContext.Session.GetString(AppConstants.Fullname),
                nik = HttpContext.Session.GetString(AppConstants.NIK),
                compId = HttpContext.Session.GetString(AppConstants.CompId)
            };
            return Json(new { data = datas, status = "", message = "" });
        }

        public async Task<JsonResult> Login(string username, string password)
        {
            //HttpContext.Session.Clear();
            string msg = "";
            string sts = "";
            string token = string.Empty;
            string nik = string.Empty;
            string fullName = string.Empty;
            string email = string.Empty;
            string compId = string.Empty;
            var response = new ApiResponse();
            //HttpContext context = this.Accessor.HttpContext;
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Login", "SYSTEM", url,""));
                response = await _client.GetApiResponseLogin<ViewModelEmployeeAuthentication>($"{url}/authenticates/{username}/{password}");
                //msg = "";
                //sts = "Success";
                msg = response.Message;
                sts = response.Status;
                if (response.Data != null)
                {
                    ViewModelEmployeeAuthentication usr = (ViewModelEmployeeAuthentication)response.Data;
                    token = usr.TOKEN;
                    nik = usr.EMPLOYEEBASICINFOID;
                    fullName = usr.FULL_NAME;
                    email = usr.EMAIL;
                    compId = usr.COMPID;

                    ViewData["KeyName"] = "";
                    HttpContext.Session.SetString(AppConstants.TokenSessionKey, token);
                    HttpContext.Session.SetString(AppConstants.NIK, nik);
                    HttpContext.Session.SetString(AppConstants.CompId, compId);
                    HttpContext.Session.SetString(AppConstants.UserId, usr.ID.ToString());
                    HttpContext.Session.SetString(AppConstants.Password, Encryptspa.Common.Encrypt(usr.USERPPWD.ToString()));
                    HttpContext.Session.SetString(AppConstants.Fullname, fullName);

                    HttpContext.Session.SetString(AppConstants.SessionMenuKey, JsonConvert.SerializeObject(usr.MENULIST));
                    HttpContext.Session.SetString(AppConstants.SessionPermissionKey, JsonConvert.SerializeObject(usr.PERMISSIONLIST));
                    //ApplicationCacheManager.Set(ApplicationCacheManager.PermissionCacheKey, usr.PERMISSIONLIST);
                    //ApplicationCacheManager.Set(ApplicationCacheManager.PermissionMenuCacheKey, usr.MENULIST);
                }
            }
            catch (Exception e)
            {
                msg = e.Message;
                sts = "failed";
            }
            return Json(new { data = "", status = sts, message = msg });
        }
    }
}