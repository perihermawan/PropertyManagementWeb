using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using propertymanagement.web.Common;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Threading.Tasks;
using System;
using propertymanagement.web.Areas.Marketing.Models.ViewModel;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;

namespace propertymanagement.web.Areas.Marketing.Controllers.RevenueSharing.RsCharge
{
    [Area("Marketing/RevenueSharing/RsCharge")]
    public class RsChargeProgressiveController : Controller
    {
        ILogger<RsChargeProgressiveController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public RsChargeProgressiveController(ApiClientFactory client, ILogger<RsChargeProgressiveController> logger)
        {
            this.logger = logger;
            _client = client;
        }

        // GET: RsChargeProgressiveController
        public IActionResult Index()
        {
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeProgressive/Index.cshtml");
        }

        // GET: RsChargeProgressiveController/Create
        public ActionResult Create()
        {
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeProgressive/Add.cshtml");
        }

        // GET: RsChargeProgressiveController/Edit/5
        public ActionResult Edit(string id)
        {
            ViewBag.Action = "edit";
            ViewBag.RentId = id;
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeProgressive/Edit.cshtml");
        }

        // GET: RsChargeProgressiveController/Details/5
        public ActionResult Details(string id)
        {
            ViewBag.Action = "view";
            ViewBag.RentId = id;
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeProgressive/Edit.cshtml");
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll(string type, string field, string op, string value)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<RsChargeViewModel>>($"{url}/GetRevenueSharingChargeList?type={type}&field={field}&op={op}&value={value}");
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Progressive Revenue Sharing Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Progressive Revenue Sharing Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Progressive Revenue Sharing Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, response.IsAdd, response.IsEdit, response.IsDelete });
        }

        [HttpGet]
        public async Task<IActionResult> GetAllDataPSM()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<RsChargeProgressiveItemViewModel>>($"{url}/GetAllDataPSM?type=prog");
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
        public async Task<IActionResult> GetRsChargeByRentId(string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                response = await _client.GetApiResponse<List<RsChargeProgressiveFormViewModel>>($"{url}/GetRsChargeByRentId?type=prog&rentId=" + rentId);
                if (response.Data == null)
                {
                    response = await _client.GetApiResponse<RentDetail>($"{url}/GetRsByRentId/{rentId}");
                    var jsonData = JsonConvert.SerializeObject(response.Data);
                    var rentDetail = JsonConvert.DeserializeObject<RentDetail>(jsonData);
                    List<RsChargeProgressiveFormViewModel> items = new List<RsChargeProgressiveFormViewModel>();
                    items.Add(new RsChargeProgressiveFormViewModel()
                    {
                        FormId = null,
                        RentId = rentDetail.RentId,
                        Installments = rentDetail.Installments,
                        Square = rentDetail.Square,
                        OutstandingAmount = rentDetail.OutstandingAmount,
                        RentAmount = rentDetail.RentAmount,
                        RemarksRentCharge = rentDetail.RemarksRentCharge,
                        Approve = false,  // Set nilai default
                        IsDeleted = rentDetail.IsDeleted,
                        IsGeneratePaymentSchedule = false,  // Set nilai default
                        LocationMap = rentDetail.LocationMap,
                        ChargeType = rentDetail.ChargeType,
                        KsmNumber = rentDetail.KSMNumber,
                        PsmNumber = rentDetail.PSMNumber,
                        TenantOwner = rentDetail.TenantOwner,
                        OutletName = rentDetail.OutletName,
                        UnitOwner = rentDetail.UnitOwner,
                        StartDate = rentDetail.StartDate,
                        EndDate = rentDetail.EndDate,
                        IsFoodCourt = rentDetail.IsFoodCourt,
                        Editable = 1,  // Set nilai default
                        ChargeDateFrom = rentDetail.ChargeDateFrom,
                        ChargeDateTo = rentDetail.ChargeDateTo,
                        OmsetFrom = 0,
                        OmsetTo = 0,
                        Description = rentDetail.Description,
                        MAGPortion = 0,  // Set nilai default
                        MinimumAmount = 0,  // Set nilai default
                        CreateDate = rentDetail.CreateDate,
                        UpdateDate = rentDetail.UpdateDate,
                        DeleteDate = rentDetail.DeleteDate,
                        CreateUser = rentDetail.CreateUser,
                        UpdateUser = rentDetail.UpdateUser,
                        DeleteUser = rentDetail.DeleteUser
                    });

                    response.Data = items;
                }
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg });
        }

        // POST: RsChargeProgressiveController/Create
        [HttpPost]
        public async Task<IActionResult> OnCreate(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                var obj = JsonConvert.DeserializeObject<List<RsChargeProgressiveInputViewModel>>(dataParam);
                var data = JsonConvert.SerializeObject(obj, Formatting.Indented);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonFormProgressiveRsCharge/{user}", data);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsCharge/RsChargeProgressive" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }



        // POST: RsChargeProgressiveController/Edit/data
        [HttpPost]
        public async Task<IActionResult> OnEdit(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {
                var obj = JsonConvert.DeserializeObject<List<RsChargeProgressiveInputViewModel>>(dataParam);
                var data = JsonConvert.SerializeObject(obj, Formatting.Indented);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonFormProgressiveRsCharge/{user}", data);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsCharge/RsChargeProgressive" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // GET: RsChargeProgressiveController/Delete/5
        public async Task<IActionResult> OnDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                var obj = JsonConvert.DeserializeObject<RsChargeDelViewModel>(dataParam);
                obj.Type = "prog";
                var data = JsonConvert.SerializeObject(obj, Formatting.Indented);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonRsCharge/{user}", data);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsCharge/RsChargeProgressive" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
