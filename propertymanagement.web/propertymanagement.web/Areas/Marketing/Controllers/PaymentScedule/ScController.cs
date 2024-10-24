using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using propertymanagement.web.Areas.Marketing.Models.ViewModel;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Controllers.PaymentSchedule
{
    [Area("Marketing/PaymentSchedule")]
    public class ScController : Controller
    {
        ILogger<ScController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public ScController(ApiClientFactory client, ILogger<ScController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        public IActionResult Index()
        {
            ViewBag.Type = "SC";
            return View("/Areas/Marketing/Views/PaymentSchedule/MF/Index.cshtml");
        }

        public async Task<IActionResult> GetDataAll(string field, string op, string value)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<PaymentScheduleMfViewModel>>($"{url}/GetPaymentScheduleMfList?field=" + field + "&op=" + op + "&value=" + value + "&type=SC");
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "SC Payment Schedule Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "SC Payment Schedule Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "SC Payment Schedule Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }


        public IActionResult Detail(string id, string mode)
        {
            ViewBag.Type = "SC";
            ViewBag.SourceId = id;
            ViewBag.SourceCode = mode;
            return View("/Areas/Marketing/Views/PaymentSchedule/MF/Detail.cshtml");
        }

        public async Task<IActionResult> GetCustomerInfoListMfBySourceId(string sourceId, string sourceCode)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<PaymentScheduleCustomerInfoMfViewModel>>($"{url}/GetCustomerInfoMfListBySourceId?sourceId=" + sourceId + "&sourceCode=" + sourceCode); ;
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            
            return Json(new { data = response.Data, status = sts, message = msg });
        }

        public async Task<IActionResult> OnSave(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonMsMFCharge/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/PaymentSchedule/SC" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

    }

}
