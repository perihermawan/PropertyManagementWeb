using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Areas.Master.Models.DTO;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace propertymanagementt.web.Areas.Marketing.Controllers.Rent
{
    [Area("Marketing/Rent")]
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
            return View("/Areas/Marketing/Views/Rent/Rent/Index.cshtml");
        }

        [HttpGet]
        public async Task<IActionResult> GetDataAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentList", $"{url}/GetRentList", "", ""));
                response = await _client.GetApiResponse<List<RentListModel>>($"{url}/GetRentList");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRentList", $"{url}/GetRentList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Rent Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Rent Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Rent Delete").ToList().Count > 0 ? "Yes" : "No";
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
            var Lob = await GetDataLob();
            var ChargeTo = await GetDataChargeTo();
            var MarketingAgent = await GetMarketingAgent();
            var Owner = await GetOwner();
            var Tenant = await GetTenant();
            var PipeType = await GetDataPipeType();
            var PressureType = await GetDataPressureType();
            var Departement = await GetDataDepartement();
            var UnitType = await GetDataUnitType();
            var Keterangan = await GetDataKeterangan();
            var DueDate = await GetDataDueDate();
            var nextKsmPsm = await GetDataNextKsmPsm();

            ViewBag.OutletType = OutletType.Data;
            ViewBag.Lob = Lob.Data;
            ViewBag.ChargeTo = ChargeTo.Data;
            ViewBag.MarketingAgent = MarketingAgent.Data;
            ViewBag.Owner = Owner.Data;
            ViewBag.Tenant = Tenant.Data;
            ViewBag.PipeType = PipeType.Data;
            ViewBag.PressureType = PressureType.Data;
            ViewBag.Departement = Departement.Data;
            ViewBag.UnitType = UnitType.Data;
            ViewBag.Keterangan = Keterangan.Data;
            ViewBag.DueDate = DueDate.Data;
            ViewBag.NextKsmPsm = nextKsmPsm.Data;

            ViewBag.Action = "Create";

            return View("/Areas/Marketing/Views/Rent/Rent/Add.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> Create(RentUnitTelp data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonMsRentUnitTelp/{user}", "", ""));
                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsRentUnitTelp/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonMsRentUnitTelp/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Rent/Rent" });
            }
            catch (Exception ex)
            {
                    return Json(new { status = "false", message = ex.Message });
            }
        }
        
        [HttpPost]
        public async Task<IActionResult> ValidateCreate(RentKsm data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("ValidateCreate", $"{url}/ValidateCreate", "", ""));
                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<ValidateRentModel>($"{url}/ValidateCreate", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("ValidateCreate", $"{url}/ValidateCreate", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { data = response.Data, status = sts, message = msg, url = "" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
        public async Task<ActionResult> Edit(string rentId)
        {
            var OutletType = await GetDataOutletType();
            var Lob = await GetDataLob();
            var ChargeTo = await GetDataChargeTo();
            var MarketingAgent = await GetMarketingAgent();
            var Owner = await GetOwner();
            var Tenant = await GetTenant();
            var PipeType = await GetDataPipeType();
            var PressureType = await GetDataPressureType();
            var Departement = await GetDataDepartement();
            var UnitType = await GetDataUnitType();
            var Keterangan = await GetDataKeterangan();
            var DueDate = await GetDataDueDate();
            var nextKsmPsm = await GetDataNextKsmPsm();
            var rentData = await GetRentById(rentId);
            var rentDData = await GetRentDById(rentId);

            ViewBag.OutletType = OutletType.Data;
            ViewBag.Lob = Lob.Data;
            ViewBag.ChargeTo = ChargeTo.Data;
            ViewBag.MarketingAgent = MarketingAgent.Data;
            ViewBag.Owner = Owner.Data;
            ViewBag.Tenant = Tenant.Data;
            ViewBag.PipeType = PipeType.Data;
            ViewBag.PressureType = PressureType.Data;
            ViewBag.Departement = Departement.Data;
            ViewBag.UnitType = UnitType.Data;
            ViewBag.Keterangan = Keterangan.Data;
            ViewBag.DueDate = DueDate.Data;
            ViewBag.NextKsmPsm = nextKsmPsm.Data;
            ViewBag.RentData = rentData.Data;
            ViewBag.rentDData = JsonConvert.SerializeObject(rentDData.Data);

            ViewBag.RentDataJson = JsonConvert.SerializeObject(rentData.Data);

            ViewBag.Action = "Edit";

            return View("/Areas/Marketing/Views/Rent/Rent/Edit.cshtml");
        }

        [HttpPost]
        public async Task<IActionResult> Edit(RentUnitTelp data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Update", $"{url}/ExecuteSPEdit/sp_upd_JsonMsRentUnitTelp/{user}", "", ""));
                var model = JsonConvert.SerializeObject(data);

                response = await _client.PutApiResponse<string>($"{url}/ExecuteSPEdit/sp_upd_JsonMsRentUnitTelp/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Update", $"{url}/ExecuteSPEdit/sp_upd_JsonMsRentUnitTelp/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Rent/Rent" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<ActionResult> Details(string rentId)
        {
            var OutletType = await GetDataOutletType();
            var Lob = await GetDataLob();
            var ChargeTo = await GetDataChargeTo();
            var MarketingAgent = await GetMarketingAgent();
            var Owner = await GetOwner();
            var Tenant = await GetTenant();
            var PipeType = await GetDataPipeType();
            var PressureType = await GetDataPressureType();
            var Departement = await GetDataDepartement();
            var UnitType = await GetDataUnitType();
            var Keterangan = await GetDataKeterangan();
            var DueDate = await GetDataDueDate();
            var nextKsmPsm = await GetDataNextKsmPsm();
            var rentData = await GetRentById(rentId);
            var rentDData = await GetRentDById(rentId);

            ViewBag.OutletType = OutletType.Data;
            ViewBag.Lob = Lob.Data;
            ViewBag.ChargeTo = ChargeTo.Data;
            ViewBag.MarketingAgent = MarketingAgent.Data;
            ViewBag.Owner = Owner.Data;
            ViewBag.Tenant = Tenant.Data;
            ViewBag.PipeType = PipeType.Data;
            ViewBag.PressureType = PressureType.Data;
            ViewBag.Departement = Departement.Data;
            ViewBag.UnitType = UnitType.Data;
            ViewBag.Keterangan = Keterangan.Data;
            ViewBag.DueDate = DueDate.Data;
            ViewBag.NextKsmPsm = nextKsmPsm.Data;
            ViewBag.RentData = rentData.Data;
            ViewBag.rentDData = JsonConvert.SerializeObject(rentDData.Data);

            ViewBag.RentDataJson = JsonConvert.SerializeObject(rentData.Data);

            ViewBag.Action = "Details";

            return View("/Areas/Marketing/Views/Rent/Rent/Edit.cshtml");
        }
        public async Task<IActionResult> onDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonRentKsm/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Rent/Rent" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<ApiResponse> GetRentById(string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentById", $"{url}/GetRentById/{rentId}", "", ""));
                response = await _client.GetApiResponse<RentKsmEditModel>($"{url}/GetRentById/{rentId}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRentById", $"{url}/GetRentById/{rentId}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
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
        public async Task<ApiResponse> GetRentDById(string rentId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetRentDById", $"{url}/GetRentDById/{rentId}", "", ""));
                response = await _client.GetApiResponse<List<ListUnitTelpModel>>($"{url}/GetRentDById/{rentId}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetRentDById", $"{url}/GetRenDtById/{rentId}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
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

        [HttpGet]
        public async Task<IActionResult> GetDataOutletAll()
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
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }
        
        [HttpGet]
        public async Task<IActionResult> GetDataGroupAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetGroupList", $"{url}/GetGroupList", "", ""));
                response = await _client.GetApiResponse<List<GroupListModel>>($"{url}/GetGroupList");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetGroupList", $"{url}/GetGroupList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }
        
        [HttpGet]
        public async Task<IActionResult> GetDataUnitAll(string mapNumber, string floor, string block, string number, string statusDesc)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataUnitList", $"{url}/GetDataUnitList?mapNumber={mapNumber}&floor={floor}&block={block}&number={number}&statusDesc={statusDesc}", "", ""));
                response = await _client.GetApiResponse<List<RentUnitListModel>>($"{url}/GetDataUnitList?mapNumber={mapNumber}&floor={floor}&block={block}&number={number}&statusDesc={statusDesc}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataUnitList", $"{url}/GetDataUnitList?mapNumber={mapNumber}&floor={floor}&block={block}&number={number}&statusDesc={statusDesc}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        [HttpGet]
        public async Task<ApiResponse> GetDataNextKsmPsm()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetNextKsmPsm", $"{url}/GetNextKsmPsm", "", ""));
                response = await _client.GetApiResponse<List<NextKsmPsmModel>>($"{url}/GetNextKsmPsm");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetNextKsmPsm", $"{url}/GetNextKsmPsm", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return response;
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
        public async Task<ApiResponse> GetDataDueDate()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataDueDate", $"{url}/GetDataDueDate", "", ""));
                response = await _client.GetApiResponse<List<DueDateModel>>($"{url}/GetDataDueDate");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataOutletType", $"{url}/GetDataDueDate", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        public async Task<ApiResponse> GetDataUnitType()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataUnitType", $"{url}/GetDataUnitType", "", ""));
                response = await _client.GetApiResponse<List<UnitTypeListModel>>($"{url}/GetDataUnitType");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataUnitType", $"{url}/GetDataUnitType", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        public async Task<ApiResponse> GetDataDepartement()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataDepartement", $"{url}/GetDataDepartement", "", ""));
                response = await _client.GetApiResponse<List<DepartementListModel>>($"{url}/GetDataDepartement");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataDepartement", $"{url}/GetDataDepartement", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        public async Task<ApiResponse> GetDataKeterangan()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataKeterangan", $"{url}/GetDataKeterangan", "", ""));
                response = await _client.GetApiResponse<List<KeteranganListModel>>($"{url}/GetDataKeterangan");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataKeterangan", $"{url}/GetDataKeterangan", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        
        public async Task<ApiResponse> GetDataPipeType()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataPipeType", $"{url}/GetDataPipeType", "", ""));
                response = await _client.GetApiResponse<List<PipeTypeListModel>>($"{url}/GetDataPipeType");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataPipeType", $"{url}/GetDataPipeType", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        
        public async Task<ApiResponse> GetDataPressureType()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataPressureType", $"{url}/GetDataPressureType", "", ""));
                response = await _client.GetApiResponse<List<PressureTypeListModel>>($"{url}/GetDataPressureType");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataPressureType", $"{url}/GetDataPressureType", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }

        public async Task<ApiResponse> GetDataLob()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataLob", $"{url}/GetDataLob", "", ""));
                response = await _client.GetApiResponse<List<LobListModel>>($"{url}/GetDataLob");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataLob", $"{url}/GetDataLob", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        public async Task<ApiResponse> GetSubLobByLobId(string lobId)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetSubLobByLobId", $"{url}/GetSubLobByLobId/{lobId}", "", ""));
                response = await _client.GetApiResponse<List<SubLobListModel>>($"{url}/GetSubLobByLobId/{lobId}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetSubLobByLobId", $"{url}/GetSubLobByLobId/{lobId}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }

        public async Task<ApiResponse> GetDataChargeTo()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetDataChargeTo", $"{url}/GetDataChargeTo", "", ""));
                response = await _client.GetApiResponse<List<ChargeToListModel>>($"{url}/GetDataChargeTo");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetDataChargeTo", $"{url}/GetDataChargeTo", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
        
        public async Task<ApiResponse> GetMarketingAgent()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMarketingAgent", $"{url}/GetMarketingAgent", "", ""));
                response = await _client.GetApiResponse<List<MarketingAgentListModel>>($"{url}/GetMarketingAgent");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMarketingAgent", $"{url}/GetMarketingAgent", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }

        public async Task<ApiResponse> GetOwner()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetOwner", $"{url}/GetOwner", "", ""));
                response = await _client.GetApiResponse<List<OwnerListModel>>($"{url}/GetOwner");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetOwner", $"{url}/GetOwner", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }

        public async Task<ApiResponse> GetTenant()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetTenant", $"{url}/GetTenant", "", ""));
                response = await _client.GetApiResponse<List<TenantListModel>>($"{url}/GetTenant");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetTenant", $"{url}/GetTenant", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }
    }
}
