using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using propertymanagement.web.Areas.Master.Models;
using propertymanagement.web.Areas.Master.Models.DTO;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.Models.Master;
using propertymanagement.web.Models.ViewModels;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Controllers
{
    [Area("Master")]
    public class TenantOwnerController : BaseController
    {
        ILogger<TenantOwnerController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public TenantOwnerController(ApiClientFactory client, ILogger<TenantOwnerController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        // GET: TenantOwnerController
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
                //logger.LogInformation(LogLibrary.Logging_Debug_Start("GetTenantOwnerList", $"{url}/gettenantowner", "", ""));
                response = await _client.GetApiResponse<List<TenantOwnerViewModel>>($"{url}/gettenantowner");
                //logger.LogInformation(LogLibrary.Logging_Debug_End("GetTenantOwnerList", $"{url}/gettenantowner", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit TenantandOwner").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add TenantandOwner").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete TenantandOwner").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        // GET: TenantOwnerController/Details/5
        public async Task<IActionResult> Details(string id, bool isEdit)
        {
            TenantOwnerDetailViewModel result = new TenantOwnerDetailViewModel();
            ViewBag.Action = isEdit ? "Edit" : "View";
            var responseTenantOwner = new ApiResponse();
            var responseInvoiceTo = new ApiResponse();
            var responsePersonInCharge = new ApiResponse();
            var responseCorrespondence = new ApiResponse();
            try
            {
                //logger.LogInformation(LogLibrary.Logging_Debug_Start("gettenantowner", $"{url}/gettenantowner", id.ToString(), ""));
                responseTenantOwner = await _client.GetApiResponse<List<TenantOwnerViewModel>>($"{url}/gettenantowner?tenantOwnerId={id}");
                responseInvoiceTo = await _client.GetApiResponse<InvoiceTo>($"{url}/gettenantownerinvoiceto?tenantOwnerId={id}");
                responsePersonInCharge = await _client.GetApiResponse<PersonInCharge>($"{url}/gettenantownerpic?tenantOwnerId={id}");
                responseCorrespondence = await _client.GetApiResponse<Correspondence>($"{url}/gettenantownercor?tenantOwnerId={id}");
                //logger.LogInformation(LogLibrary.Logging_Debug_End("gettenantowner", $"{url}/gettenantowner", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));
                List<TenantOwnerViewModel> tenantOwnerViewModelList = responseTenantOwner.Data as List<TenantOwnerViewModel>;
                if (tenantOwnerViewModelList.Count > 0)
                    result.TenantOwner = (TenantOwnerViewModel)tenantOwnerViewModelList.ElementAt(0);

                if (responseInvoiceTo.Data != null)
                    result.InvoiceTo = ((InvoiceTo)responseInvoiceTo.Data);

                if (responsePersonInCharge.Data != null)
                    result.PersonInCharge = ((PersonInCharge)responsePersonInCharge.Data);

                if (responseCorrespondence.Data != null)
                    result.Correspondence = ((Correspondence)responseCorrespondence.Data);

                result.IsEdit = isEdit;
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "gettenantownerdetail", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", result);
        }

        // GET: TenantOwnerController/Create
        public ActionResult Create()
        {
            return View("Add");
        }

        // POST: TenantOwnerController/Create
        [HttpPost]
        public async Task<IActionResult> OnCreate(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsTenantOwner/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/TenantOwner" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: TenantOwnerController/Edit/data
        [HttpPost]
        public async Task<IActionResult> OnEdit(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_Upd_JsonMsTenantOwner/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/TenantOwner" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // GET: TenantOwnerController/Delete/5
        public async Task<IActionResult> OnDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonMsTenantOwner/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/TenantOwner" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: TenantOwnerController/Delete/5
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
