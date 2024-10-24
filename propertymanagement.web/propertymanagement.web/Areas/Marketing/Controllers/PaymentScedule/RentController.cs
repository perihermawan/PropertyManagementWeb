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
    public class RentController : Controller
    {
        ILogger<RentController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public RentController(ApiClientFactory client, ILogger<RentController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        public IActionResult Index()
        {
            ViewBag.Type = "Rent";
            return View("/Areas/Marketing/Views/PaymentSchedule/RentRs/Index.cshtml");
        }

        public async Task<IActionResult> GetDataAll(string field, string op, string value, string type)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<PaymentScheduleViewModel>>($"{url}/GetPaymentScheduleList?field="+field+"&op="+op+"&value="+value+ "&type=" + type);
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Rent Payment Schedule Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Rent Payment Schedule Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Rent Payment Schedule Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }


        public IActionResult Detail(string id, int ksmType)
        {
            ViewBag.Type = "Rent";
            ViewBag.RentId = id;
            ViewBag.KsmType = ksmType;
            return View("/Areas/Marketing/Views/PaymentSchedule/RentRs/Detail.cshtml");
        }

        public async Task<IActionResult> GetCustomerInfoListByRentId(string rentId, int ksmType)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<PaymentScheduleCustomerInfoViewModel>>($"{url}/GetCustomerInfoListByRentId?rentId=" + rentId + "&ksmType=" + ksmType); ;
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
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonMsRentCharge/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/PaymentSchedule/Rent" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }



        public async Task<IActionResult> GetMagPortionFromProgressiveRs(decimal omsetAmount, string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<decimal>($"{url}/GetMagPortionFromProgressiveRs?omsetAmount=" + omsetAmount + "&rentId=" + rentId); ;
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return Json(new { data = response.Data, status = sts, message = msg });
        }
    }


   
}
