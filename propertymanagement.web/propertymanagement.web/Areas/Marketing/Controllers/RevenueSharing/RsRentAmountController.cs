using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Common;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using propertymanagement.web.Areas.Marketing.Models.ViewModel;
using System.Data;
using propertymanagement.web.Areas.Marketing.Models.DTO;

namespace propertymanagement.web.Areas.Marketing.Controllers.RevenueSharing
{
    [Area("Marketing/RevenueSharing")]
    public class RsRentAmountController : Controller
    {
        ILogger<RsRentAmountController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public RsRentAmountController(ApiClientFactory client, ILogger<RsRentAmountController> logger)
        {
            this.logger = logger;
            this._client = client;
        }
        // GET: RsRentAmountController
        public ActionResult Index()
        {
            return View("/Areas/Marketing/Views/RevenueSharing/RsRentAmount/Index.cshtml");
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll(string field, string op, string value)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRsRentAmountList", $"{url}/GetRsRentAmountList?field={field}&op={op}&value={value}", "", ""));
                response = await _client.GetApiResponse<List<RsRentAmountViewModel>>($"{url}/GetRsRentAmountList?field={field}&op={op}&value={value}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRsRentAmountList", $"{url}/GetRsRentAmountList?field= {field} &op= {op} &value= {value}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "RS Rent Amount Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "RS Rent Amount Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "RS Rent Amount Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        // GET: RsRentAmountController/Details/5
        public async Task<IActionResult> Details(string id)
        {
            ViewBag.Action = "Detail";
            var response = new ApiResponse();

            try
            {
                DataRowState rowState = DataRowState.Unchanged;
                var rentAmountItems = await _client.GetApiResponse<List<RentAmountItem>>($"{url}/GetRentAmountItemsById/{id}");
                var dpItems = await _client.GetApiResponse<List<DpItem>>($"{url}/GetDownPaymentListById/{id}");
                var rentDetail = await _client.GetApiResponse<RentDetail>($"{url}/GetRentDetail/{id}");

                // pass all variable to view
                ViewBag.RentId = id;
                ViewBag.RentAmountItems = rentAmountItems.Data;
                ViewBag.DpItems = dpItems.Data;
                ViewBag.RentDetail = rentDetail.Data;
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "Edit", id.ToString(), "", e.Message, ""));
            }
            return View("/Areas/Marketing/Views/RevenueSharing/RsRentAmount/Edit.cshtml");
        }

        [HttpGet]
        public async Task<IActionResult> GetDataPSMAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentRentAmount", $"{url}/GetRentRentAmount", "", ""));
                response = await _client.GetApiResponse<List<PSMListModel>>($"{url}/GetRentRentAmount");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRentRentAmount", $"{url}/GetRentRentAmount", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        [HttpGet]
        public async Task<IActionResult> GetDataPSMById(string id)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentPullOut", $"{url}/GetRentPullOut", "", ""));
                response = await _client.GetApiResponse<List<PSMListModel>>($"{url}/GetRentPullOut");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRentPullOut", $"{url}/GetRentPullOut", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        [HttpGet]
        public async Task<IActionResult> GetDataChangeTypeAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataChargeTypeAll", $"{url}/GetDataChargeTypeAll", "", ""));
                response = await _client.GetApiResponse<List<ChangeListModel>>($"{url}/GetDataChargeTypeAll");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataChargeTypeAll", $"{url}/GetDataChargeTypeAll", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { response = response });
        }

        // GET: RsRentAmountController/Create
        public ActionResult Create()
        {
            ViewBag.Action = "Create";
            return View("/Areas/Marketing/Views/RevenueSharing/RsRentAmount/Add.cshtml");
        }

        // GET: RsRentAmountController/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            ViewBag.Action = "Edit";
            var response = new ApiResponse();

            try
            {
                var rentAmountItems = await _client.GetApiResponse<List<RentAmountItem>>($"{url}/GetRentAmountItemsById/{id}");
                var dpItems = await _client.GetApiResponse<List<DpItem>>($"{url}/GetDownPaymentListById/{id}");
                var rentDetail = await _client.GetApiResponse<RentDetail>($"{url}/GetRentDetail/{id}");

                // pass all variable to view
                ViewBag.RentId = id;
                ViewBag.RentAmountItems = rentAmountItems.Data;
                ViewBag.DpItems = dpItems.Data;
                ViewBag.RentDetail = rentDetail.Data;
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "Edit", id.ToString(), "", e.Message, ""));
            }
            return View("/Areas/Marketing/Views/RevenueSharing/RsRentAmount/Edit.cshtml");
        }

        // POST: RsRentAmountController/Create
        [HttpPost]
        public async Task<IActionResult> Create(RentAmountRequest data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonRentAmount/{user}", "", ""));

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonRentAmount/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonRentAmount/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsRentAmount" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: RsRentAmountController/Edit/5
        [HttpPost]
        public async Task<IActionResult> Edit(RentAmountRequest data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_upd_JsonRentAmount/{user}", "", ""));

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonRentAmount/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_upd_JsonRentAmount/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsRentAmount" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: RsRentAmountController/Delete/5
        public async Task<IActionResult> OnDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonRentAmount/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsRentAmount" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
