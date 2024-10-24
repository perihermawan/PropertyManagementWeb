using Microsoft.AspNetCore.Http;
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

namespace propertymanagement.web.Areas.Marketing.Controllers
{
    [Area("Marketing")]
    public class PullOutController : BaseController
    {
        ILogger<PullOutController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public PullOutController(ApiClientFactory client, ILogger<PullOutController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        // GET: PullOutController
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
                //logger.LogInformation(LogLibrary.Logging_Debug_Start("GetPullOutList", $"{url}/gettenantowner", "", ""));
                response = await _client.GetApiResponse<List<PullOutViewModel>>($"{url}/GetPullOutList");
                //logger.LogInformation(LogLibrary.Logging_Debug_End("GetPullOutList", $"{url}/gettenantowner", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit PullOut").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add PullOut").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete PullOut").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        // GET: PullOutController/Details/5
        public async Task<IActionResult> Details(string id, bool isEdit)
        {
            ViewBag.Action = isEdit ? "edit" : "view";
            ViewBag.RentId = id;
            return View("Edit");
        }


        [HttpGet]
        public async Task<IActionResult> GetRent(string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<PullOutRentViewModel>($"{url}/GetRent?rentId=" + rentId);
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg });
        }

        [HttpGet]
        public async Task<IActionResult> GetPullOutDetail(string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<PullOutDetailViewModel>($"{url}/GetPullOutDetail?rentId=" + rentId);
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg });
        }


        // POST: PullOutController/PullOut
        [HttpPost]
        public async Task<IActionResult> OnPullOut(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonRentPullOutCreate", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/PullOut" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: PullOutController/Closing
        [HttpPost]
        public async Task<IActionResult> OnClosing(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonRentClosingCreate", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/PullOut" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }


        // POST: PullOutController/BAUtility
        [HttpPost]
        public async Task<IActionResult> OnBAUtility(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_Upd_JsonMsPullOut/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/PullOut" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

    }
}
