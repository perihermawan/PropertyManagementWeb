using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Controllers
{
    [Area("Marketing")]
    public class RentController : BaseController
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
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRent", $"{url}/GetRent", "", ""));
                response = await _client.GetApiResponse<List<RentListModel>>($"{url}/GetRent");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRent", $"{url}/GetRent", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Rent").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Rent").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Rent").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        public async Task<ActionResult> Create()
        {
            var OutletType = await GetDataOutletType();
            ViewBag.OutletType = OutletType.Data;
            ViewBag.Action = "Create";
            return View("Add");
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

        public async Task<ApiResponse> GetDataOutletType()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataOutletType", $"{url}/GetDataOutletType", "", ""));
                response = await _client.GetApiResponse<List<OutletTypeListModel>>($"{url}/GetDataOutletType");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataOutletType", $"{url}/GetDataOutletType", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }

        [HttpGet]
        public async void GetDataOutletAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetOutletList", $"{url}/GetOutletList", "", ""));
                response = await _client.GetApiResponse<List<OutletListModel>>($"{url}/GetOutletList");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetOutletList", $"{url}/GetOutletList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            //ViewData["statusList"] = new SelectList(response.Data, "SYSTEM_CD", "SYSTEM_VALUE");
        }
    }
}
