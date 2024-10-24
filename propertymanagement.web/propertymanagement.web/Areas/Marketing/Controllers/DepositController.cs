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
    public class DepositController : BaseController
    {
        ILogger<DepositController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public DepositController(ApiClientFactory client, ILogger<DepositController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        // GET: DepositController
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
                response = await _client.GetApiResponse<List<DepositViewModel>>($"{url}/getalldeposit");
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Deposit Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Deposit Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Deposit Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        [HttpGet]
        public async Task<IActionResult> GetRentForDepositDataAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<DepositRentViewModel>>($"{url}/GetRentForDepositDataAll");
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg});
        }

        [HttpGet]
        public async Task<IActionResult> GetDepositByRentId(string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<DepositDetailViewModel>>($"{url}/GetDepositByRentId?rentId="+rentId);
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg });
        }

        // GET: DepositController/Details/5
        public async Task<IActionResult> Details(string id, bool isEdit)
        {
            ViewBag.Action = isEdit ? "edit" : "view";
            ViewBag.RentId = id;
            return View("Edit");
        }

        // GET: DepositController/Create
        public ActionResult Create()
        {
            return View("Add");
        }

        // POST: DepositController/Create
        [HttpPost]
        public async Task<IActionResult> OnCreate(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonTrDeposit/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Deposit" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: DepositController/Edit/data
        [HttpPost]
        public async Task<IActionResult> OnEdit(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_Upd_JsonTrDeposit/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Deposit" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // GET: DepositController/Delete/5
        public async Task<IActionResult> OnDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonTrDeposit/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Deposit" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: DepositController/Delete/5
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
    }
}
