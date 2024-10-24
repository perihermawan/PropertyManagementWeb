using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using propertymanagement.web.Common;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Threading.Tasks;
using System;
using propertymanagement.web.Areas.Marketing.Models.ViewModel;
using propertymanagement.web.Areas.Marketing.Models;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace propertymanagement.web.Areas.Marketing.Controllers.RevenueSharing.RsCharge
{
    [Area("Marketing/RevenueSharing/RsCharge")]
    public class RsChargeFlatController : Controller
    {
        ILogger<RsChargeFlatController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public RsChargeFlatController(ApiClientFactory client, ILogger<RsChargeFlatController> logger)
        {
            this.logger = logger;
            _client = client;
        }

        // GET: RsChargeFlatController
        public IActionResult Index()
        {
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeFlat/Index.cshtml");
        }

        // GET: RsChargeFlatController/Create
        public ActionResult Create()
        {
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeFlat/Add.cshtml");
        }

        // GET: RsChargeFlatController/Edit/5
        public ActionResult Edit(string id)
        {
            ViewBag.Action = "edit";
            ViewBag.RentId = id;
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeFlat/Edit.cshtml");
        }

        // GET: RsChargeFlatController/Details/5
        public ActionResult Details(string id)
        {
            ViewBag.Action = "view";
            ViewBag.RentId = id;
            return View("/Areas/Marketing/Views/RevenueSharing/RsCharge/RsChargeFlat/Edit.cshtml");
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
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Flat Revenue Sharing Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Flat Revenue Sharing Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Flat Revenue Sharing Delete").ToList().Count > 0 ? "Yes" : "No";
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
                response = await _client.GetApiResponse<List<RsChargeFlatItemViewModel>>($"{url}/GetAllDataPSM?type=flat");
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
                response = await _client.GetApiResponse<List<RsChargeFlatFormViewModel>>($"{url}/GetRsChargeByRentId?type=flat&rentId=" + rentId);

                if (response.Data == null)
                {
                    response = await _client.GetApiResponse<RentDetail>($"{url}/GetRsByRentId/{rentId}");
                    var jsonData = JsonConvert.SerializeObject(response.Data);
                    var rentDetail = JsonConvert.DeserializeObject<RentDetail>(jsonData);
                    List<RsChargeFlatFormViewModel> items = new List<RsChargeFlatFormViewModel>();
                    items.Add(new RsChargeFlatFormViewModel()
                    {
                        FormId = null,
                        RentId = rentDetail.RentId,
                        Installments = rentDetail.Installments,
                        Square = rentDetail.Square,
                        OutstandingAmount = rentDetail.OutstandingAmount,
                        RentAmount = rentDetail.RentAmount,
                        RemarksRentCharge = rentDetail.RemarksRentCharge,
                        Approve = false, // Set nilai default
                        IsDeleted = rentDetail.IsDeleted,
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
                        PeriodFrom = rentDetail.StartDate,
                        PeriodTo = rentDetail.EndDate,
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

        // POST: RsChargeFlatController/Create
        [HttpPost]
        public async Task<IActionResult> OnCreate(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                var obj = JsonConvert.DeserializeObject<List<RsChargeFlatInputViewModel>>(dataParam);
                var data = JsonConvert.SerializeObject(obj, Formatting.Indented);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonFormFlatRsCharge/{user}", data);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsCharge/RsChargeFlat" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // POST: RsChargeFlatController/Edit/data
        [HttpPost]
        public async Task<IActionResult> OnEdit(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {
                var obj = JsonConvert.DeserializeObject<List<RsChargeFlatInputViewModel>>(dataParam);
                var data = JsonConvert.SerializeObject(obj, Formatting.Indented);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_JsonFormFlatRsCharge/{user}", data);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsCharge/RsChargeFlat" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        // GET: RsChargeFlatController/Delete/5
        public async Task<IActionResult> OnDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                var obj = JsonConvert.DeserializeObject<RsChargeDelViewModel>(dataParam);
                obj.Type = "flat";
                var data = JsonConvert.SerializeObject(obj, Formatting.Indented);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonRsCharge/{user}", data);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/RevenueSharing/RsCharge/RsChargeFlat" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
