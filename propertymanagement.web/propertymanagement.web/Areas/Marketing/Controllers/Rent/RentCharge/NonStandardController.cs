using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using propertymanagement.web.Areas.Marketing.Models.DTO;
using System.Linq;
using System.Data;

namespace propertymanagement.web.Areas.Marketing.Controllers.Rent.RentCharge
{
    [Area("Marketing/Rent/RentCharge")]
    public class NonStandardController : BaseController
    {
        ILogger<NonStandardController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        string viewPath = "/Areas/Marketing/Views/Rent/RentCharge/NonStandard";

        public NonStandardController(ApiClientFactory client, ILogger<NonStandardController> logger)
        {
            this.logger = logger;
            _client = client;
        }

        public IActionResult Index()
        {
            return View($"{viewPath}/Index.cshtml");
        }

        public async Task<IActionResult> GetDataAll([FromQuery] string colName = "", string operatorQuery = "", string searchQuery = "", string mode = "")
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<NonStandardChargeListModel>>($"{url}/GetNonStandardChargeList");
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Non Standard Rent Charge Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Non Standard Rent Charge Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Non Standard Rent Charge Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        [HttpGet]
        public async Task<IActionResult> GetDataPSMAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<PSMListModel>>($"{url}/GetRentNonStandard");
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, response.IsAdd, response.IsEdit, response.IsDelete });
        }

        public ActionResult Create()
        {
            ViewBag.Action = "Create";
            return View($"{viewPath}/Add.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> Create(NonStandardChargeRequest data)
        {
            string msg = "";
            string sts = "";
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonNonStandardCharge/{user}", "", ""));

                // set FormId to Guid.NewGuid() for each item
                foreach (var item in data.items)
                {
                    item.FormId = Guid.NewGuid();
                }

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonNonStandardCharge/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonNonStandardCharge/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Rent/RentCharge/NonStandard" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<IActionResult> Edit(string id)
        {
            ViewBag.Action = "Edit";
            var response = new ApiResponse();

            try
            {
                DataRowState rowState = DataRowState.Unchanged;
                var rentDetail = await _client.GetApiResponse<RentDetail>($"{url}/GetRentDetail/{id}");
                var nonStandardItem = await _client.GetApiResponse<List<NonStandardChargeItemModel>>($"{url}/GetNonstandardItemById/{id}");

                // pass all variable to view
                ViewBag.RentId = id;
                ViewBag.RentDetail = rentDetail.Data;
                ViewBag.NonStandardItem = nonStandardItem.Data;
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "Edit", id.ToString(), "", e.Message, ""));
            }

            return View($"{viewPath}/Edit.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> Edit(NonStandardChargeRequest data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_upd_JsonNonStandardCharge/{user}", "", ""));
                foreach (var item in data.items)
                {
                    if(item.DataRowState == DataRowState.Added)
                    {
                        item.FormId = Guid.NewGuid();
                    }
                }

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonNonStandardCharge/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_upd_JsonNonStandardCharge/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Rent/RentCharge/NonStandard" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<IActionResult> Details(string id)
        {
            ViewBag.Action = "Details";

            try
            {
                DataRowState rowState = DataRowState.Unchanged;
                var rentDetail = await _client.GetApiResponse<RentDetail>($"{url}/GetRentDetail/{id}");
                var nonStandardItem = await _client.GetApiResponse<List<NonStandardChargeItemModel>>($"{url}/GetNonstandardItemById/{id}");

                // pass all variable to view
                ViewBag.RentId = id;
                ViewBag.RentDetail = rentDetail.Data;
                ViewBag.NonStandardItem = nonStandardItem.Data;
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "Details", id.ToString(), "", e.Message, ""));
            }

            return View($"{viewPath}/Edit.cshtml");
        }

        public async Task<IActionResult> onDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonNonStandardCharge/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Rent/RentCharge/NonStandard" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
