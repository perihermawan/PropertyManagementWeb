using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using propertymanagement.web.Models.Master;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using propertymanagement.web.Common;
using Serilog;
using Microsoft.Extensions.Logging;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;

namespace propertymanagement.web.Controllers
{
    public class UserInfoController : Controller
    {
        ILogger<UserInfoController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public UserInfoController(ApiClientFactory client, ILogger<UserInfoController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        

        public IActionResult Index()
        {
            return View();
        }
        public IActionResult LoginForm()
        {
            return View();
        }

        public IActionResult Create(long id)
        {
            User user = new User();
            return View(user);
        }

        //public async Task<IActionResult> DeleteUser(string id)
        //{
        //    User user = new User();
        //    string msg = "";
        //    string sts = "";
        //    var response = new ApiResponse();
        //    try
        //    {
        //        logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", "SYSTEM", url, ""));
        //        response = await _client.GetApiResponse<UserAppModel>($"{url}/DeleteUser/{id}");
        //        logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));
        //        msg = response.Message;
        //        sts = response.Status;
        //    }
        //    catch (Exception e)
        //    {
        //        msg = e.Message;
        //    }
        //    return Json(new { data = response.Data, status = sts, message = msg, url = Url.Action(nameof(Index)) });
        //}
    }
}