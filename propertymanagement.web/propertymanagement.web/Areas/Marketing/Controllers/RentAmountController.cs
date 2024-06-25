using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Collections.Generic;
using System.Security.Policy;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Logging;
using propertymanagement.web.Areas.Master.Controllers;
using System.Linq;
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Areas.Master.Models.DTO;
using propertymanagement.web.Areas.Master.Models.ViewModel;
using propertymanagement.web.Areas.Master.Models;

namespace propertymanagement.web.Areas.Marketing.Controllers
{
    [Area("Marketing")]
    public class RentAmountController : BaseController
    {
        ILogger<RentAmountController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public RentAmountController(ApiClientFactory client, ILogger<RentAmountController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        // GET: RentAmountController
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentAmountList", $"{url}/GetRentAmountList", "", ""));
                response = await _client.GetApiResponse<List<RentAmountModel>>($"{url}/GetRentAmountList");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRentAmountList", $"{url}/GetRentAmountList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Rent Amount").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Rent Amount").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Rent Amount").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        // GET: RentAmountController/Details/5
        public async Task<IActionResult> Details(string id)
        {
            ViewUnitModel unit = new ViewUnitModel();
            ViewBag.Action = "view";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMasterUnitById", $"{url}/GetMasterUnit", id.ToString(), ""));
                response = await _client.GetApiResponse<ViewUnitModel>($"{url}/GetMasterUnitById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMasterUnitById", $"{url}/GetMasterUnitById", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    unit = ((ViewUnitModel)response.Data);
                }
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetMasterUnitById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", unit);
        }

        [HttpGet]
        public async Task<IActionResult> GetDataPSMAll()
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

        // GET: RentAmountController/Create
        public ActionResult Create()
        {
            return View("Add");
        }

        // POST: RentAmountController/Create
        [HttpPost]
        public async Task<IActionResult> Create(MapUnitModel data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonMsMapAndUnit/{user}", "", ""));
                var mapID = Guid.NewGuid();
                var unitID = Guid.NewGuid();
                data.Map.MapId = mapID;
                data.Map.UnitId = unitID;

                data.Unit.UnitId = unitID;
                data.Unit.MapId = mapID;

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsMapAndUnit/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonMsMapAndUnit/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Unit" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // GET: RentAmountController/Edit/id
        public async Task<IActionResult> Edit(string id)
        {
            ViewUnitModel unit = new ViewUnitModel();
            ViewBag.Action = "Edit";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMasterUnitById", $"{url}/GetMasterUnitById", id.ToString(), ""));
                response = await _client.GetApiResponse<ViewUnitModel>($"{url}/GetMasterUnitById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMasterUnitById", $"{url}/GetMasterUnitById", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    unit = ((ViewUnitModel)response.Data);
                }
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetMasterUnitById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", unit);
        }

        // POST: RentAmountController/Edit/data
        [HttpPost]
        public async Task<IActionResult> Edit(MapUnitModel data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", $"{url}/ExecuteSPEdit/sp_upd_JsonMsUnit/{user}", "", ""));
                var model = JsonConvert.SerializeObject(data);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonMsUnit/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", $"{url}/ExecuteSPEdit/sp_upd_JsonMsUnit/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Unit" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // GET: RentAmountController/Delete/5
        public async Task<IActionResult> onDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonMasterUnit/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Unit" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: RentAmountController/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        //public IActionResult Index()
        //{
        //    return View();
        //}

        //// GET: UnitController

        //#region Rent Amount
        //[HttpGet]
        //public async Task<IActionResult> GetDataAll()
        //{
        //    string msg = "";
        //    string sts = "";
        //    var response = new ApiResponse();
        //    try
        //    {
        //        logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentAmountList", $"{url}/GetRentAmountList", "", ""));
        //        response = await _client.GetApiResponse<List<RentAmountListModel>>($"{url}/GetRentAmountList");
        //        logger.LogInformation(LogLibrary.Logging_Debug_End("GetMasterRentList", $"{url}/GetRentAmountList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
        //        msg = response.Message;
        //        sts = response.Status;
        //        response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Rent Amount").ToList().Count > 0 ? "Yes" : "No";
        //        response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Rent Amount").ToList().Count > 0 ? "Yes" : "No";
        //        response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Rent Amount").ToList().Count > 0 ? "Yes" : "No";
        //    }
        //    catch (Exception e)
        //    {
        //        msg = e.Message;
        //    }
        //    return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        //}

        //public ActionResult CreateRentAmount()
        //{
        //    return View("Add");
        //}
        //#endregion
    }
}
