using System.Collections.Generic;
using System;
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
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Session;
using propertymanagement.web.Controllers;
using propertymanagement.web.Infrastructure;
//AAABBBCCC
namespace propertymanagement.web.Areas.Transaction.Controllers
{
    [Area("Accounting")]
    public class ARPaymentController : BaseController
    {
        ILogger<ARPaymentController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public ARPaymentController(ApiClientFactory client, ILogger<ARPaymentController> logger)
        {
            this.logger = logger;
            this._client = client;

        }
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> GetDataARPayment()
        {
            List<User> userlist = new List<User>();
            User user = new User();
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataARPayment", "SYSTEM", url,""));
                response = await _client.GetApiResponse<List<RentVoucherListModel>>($"{url}/getdetailactivitybyid");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataARPayment", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = userlist, status = sts, message = msg });
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll()
        {
            List<User> userlist = new List<User>();
            User user = new User();
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataAll", $"{url}/GetARPayment", "", ""));
                response = await _client.GetApiResponse<List<RentVoucherListModel>>($"{url}/GetARPayment");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataAll", $"{url}/GetARPayment", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Unit1").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Unit1").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Unit1").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }
    }
}
