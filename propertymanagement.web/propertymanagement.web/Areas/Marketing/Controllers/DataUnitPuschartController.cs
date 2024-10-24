using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Common;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Linq;
using propertymanagement.web.Areas.Marketing.Models.ViewModel;
using propertymanagement.web.Areas.Marketing.Models.DTO;

namespace propertymanagement.web.Areas.Marketing.Controllers
{
    [Area("Marketing")]
    public class DataUnitPuschartController : Controller
    {
        ILogger<DataUnitPuschartController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public DataUnitPuschartController(ApiClientFactory client, ILogger<DataUnitPuschartController> logger)
        {
            this.logger = logger;
            _client = client;
        }

        // GET: DataUnitPuschartController
        public ActionResult Index()
        {
            return View();
        }

        // GET: DataUnitPuschartController/Details/5
        public async Task<IActionResult> Details(string id)
        {
            DataUnitPuschartViewModel unit = new DataUnitPuschartViewModel();
            ViewBag.Action = "view";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataUnitPuschartById", $"{url}/GetDataUnitPuschartById", id.ToString(), ""));
                response = await _client.GetApiResponse<DataUnitPuschartViewModel>($"{url}/GetDataUnitPuschartById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataUnitPuschartById", $"{url}/GetDataUnitPuschartById", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    unit = ((DataUnitPuschartViewModel)response.Data);
                }
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetDataUnitPuschartById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", unit);
        }

        // GET: DataUnitPuschartController/Create
        public ActionResult Create()
        {
            return View("Add");
        }

        // GET: DataUnitPuschartController/Edit/5
        public async Task<IActionResult> Edit(string id)
        {
            DataUnitPuschartViewModel unit = new DataUnitPuschartViewModel();
            ViewBag.Action = "Edit";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataUnitPuschartById", $"{url}/GetDataUnitPuschartById", id.ToString(), ""));
                response = await _client.GetApiResponse<DataUnitPuschartViewModel>($"{url}/GetDataUnitPuschartById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataUnitPuschartById", $"{url}/GetDataUnitPuschartById", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    unit = ((DataUnitPuschartViewModel)response.Data);
                }
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetDataUnitPuschartById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", unit);
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll(string field, string op, string value)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataUnitPuschartList", $"{url}/GetDataUnitPuschartList", "", ""));
                response = await _client.GetApiResponse<List<DataUnitPuschartListViewModel>>($"{url}/GetDataUnitPuschartList?field={field}&op={op}&value={value}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataUnitPuschartList", $"{url}/GetDataUnitPuschartList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Data Unit Puschart").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Data Unit Puschart").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Data Unit Puschart").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        // POST: DataUnitPuschartController/OnCreate
        [HttpPost]
        public async Task<IActionResult> OnCreate(DataUnitPuschartModel data)
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
                return Json(new { status = sts, message = msg, url = "/Marketing/DataUnitPuschart" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: DataUnitPuschartController/OnEdit
        [HttpPost]
        public async Task<IActionResult> OnEdit(DataUnitPuschartModel data)
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
                return Json(new { status = sts, message = msg, url = "/Marketing/DataUnitPuschart" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: DataUnitPuschartController/Delete/5
        public async Task<IActionResult> OnDelete(string dataParam)
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
                return Json(new { status = sts, message = msg, url = "/Marketing/DataUnitPuschart" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
