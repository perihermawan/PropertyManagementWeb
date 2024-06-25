using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Master.Models;
using propertymanagement.web.Areas.Master.Models.DTO;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using propertymanagement.web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using propertymanagement.web.Models.ViewModels;
using propertymanagement.web.Areas.Master.Models.ViewModel;

namespace propertymanagement.web.Areas.Master.Controllers
{
    [Area("Master")]
    public class OutletController : BaseController
    {
        ILogger<OutletController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public OutletController(ApiClientFactory client, ILogger<OutletController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll()
        {
            string msg = "";
            string sts = "";
            ViewBag.Action = "Create";

            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMasterOutlet", $"{url}/GetMasterOutlet", "", ""));
                response = await _client.GetApiResponse<List<ViewOutletModel>>($"{url}/GetMasterOutlet");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMasterOutlet", $"{url}/GetMasterOutlet", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Outlet").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Outlet").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Outlet").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        public ActionResult Create()
        {
            return View("Add");
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Outlet data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonMsOutlet/{user}", "", ""));

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsOutlet/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonMsOutlet/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Outlet" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(string rowid)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", $"{url}/GetOutletByOutletId/{rowid}", "", ""));
                response = await _client.GetApiResponse<Outlet>($"{url}/GetOutletByOutletId/{rowid}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", $"{url}/GetOutletByOutletId/{rowid}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, data = response.Data });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Edit([FromBody] Outlet data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_upd_JsonMsOutlet/{user}", "", ""));

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonMsOutlet/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_upd_JsonMsOutlet/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Outlet" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<IActionResult> Delete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonMsOutlet/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Outlet" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
