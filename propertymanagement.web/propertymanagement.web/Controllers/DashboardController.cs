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
using propertymanagement.web.Models.ViewModels;
using propertymanagement.web.ServiceAPI;
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Controllers;
//using propertymanagement.web.Models.Parameter;
//using propertymanagement.web.Models.DTO;

namespace propertymanagement.Controllers
{
    public class DashboardController : Controller
    {
        ILogger<UserInfoController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public DashboardController(ApiClientFactory client, ILogger<UserInfoController> logger)
        {
            this.logger = logger;
            this._client = client;
        }
        public IActionResult Index()
        {
            return View();
        }

        //public async Task<IActionResult> GetActivityByDate(DateTime datetime)
        //{
        //    string msg = "";
        //    string sts = "";
        //    var response = new ApiResponse();
        //    try
        //    {
        //        string userId = HttpContext.Session.GetString(AppConstants.NIK);
        //        logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDetailActivity", "SYSTEM", url));
        //        response = await _client.GetApiResponse<List<ActivityHeaderModel>>($"{url}/getactivitybydate/{datetime.ToString("MM-dd-yyyy")}/{userId}");
        //        logger.LogInformation(LogLibrary.Logging_Debug_End("GetDetailActivity", "SYSTEM", url, response.Status, ""));
        //        msg = response.Message;
        //        sts = response.Status;
        //    }
        //    catch (Exception e)
        //    {
        //        msg = e.Message;
        //        sts = "fail";
        //    }
        //    return Json(new { data = response.Data, status = sts, message = msg });
        //}
        //public async Task<IActionResult> GetDetailActivityById(string Id)
        //{
        //    string msg = "";
        //    string sts = "";
        //    var response = new ApiResponse();
        //    try
        //    {
        //        logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDetailActivityById", "SYSTEM", url));
        //        response = await _client.GetApiResponse<ViewModelActivity>($"{url}/getdetailactivitybyid/{Id}");
        //        logger.LogInformation(LogLibrary.Logging_Debug_End("GetDetailActivityById", "SYSTEM", url, response.Status, ""));
        //        msg = response.Message;
        //        sts = response.Status;
        //    }
        //    catch (Exception e)
        //    {
        //        msg = e.Message;
        //        sts = "fail";
        //    }
        //    return Json(new { data = response.Data, status = sts, message = msg });
        //}

        //public async Task<IActionResult> GetActivityCompleted()
        //{
        //    string msg = "";
        //    string sts = "";
        //    var response = new ApiResponse();
        //    try
        //    {
        //        string userId = HttpContext.Session.GetString(AppConstants.NIK);
        //        logger.LogInformation(LogLibrary.Logging_Debug_Start("GetActivityCompleted", "SYSTEM", url));
        //        response = await _client.GetApiResponse<List<ViewDetailActivityCompleted>>($"{url}/getcompletedactivity/{userId}");
        //        logger.LogInformation(LogLibrary.Logging_Debug_End("GetActivityCompleted", "SYSTEM", url, response.Status, ""));
        //        msg = response.Message;
        //        sts = response.Status;
        //    }
        //    catch (Exception e)
        //    {
        //        msg = e.Message;
        //        sts = "fail";
        //    }
        //    return Json(new { data = response.Data, status = sts, message = msg });
        //}

        //[HttpPost]
        //public async Task<IActionResult> Checkin(string headerID, string nik, string remark)
        //{
        //    var response = new ApiResponse();
        //    try
        //    {
        //        var param = new CheckinParam
        //        {
        //            HeaderID = Convert.ToInt32(headerID),
        //            NIK = HttpContext.Session.GetString(AppConstants.NIK),
        //            Remark = remark
        //        };
        //        response = await _client.PostApiResponse<object>($"{url}/checkin", param);
        //        return Json(new { status = response.Status, message = response.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = "fail", message = response.Message });
        //    }
        //}

        //[HttpPost]
        //public async Task<IActionResult> Checkout(string headerID, string nik, string remark)
        //{
        //    var response = new ApiResponse();
        //    try
        //    {
        //        var param = new CheckinParam
        //        {
        //            HeaderID = Convert.ToInt32(headerID),
        //            NIK = HttpContext.Session.GetString(AppConstants.NIK),
        //            Remark = remark
        //        };
        //        response = await _client.PutApiResponse<object>($"{url}/checkout", param);
        //        return Json(new { status = response.Status, message = response.Message });
        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = "fail", message = response.Message });
        //    }
        //}
    }
}