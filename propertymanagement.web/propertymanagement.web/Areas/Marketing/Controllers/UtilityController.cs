using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Areas.Marketing.Models.DTO;
using propertymanagement.web.Areas.Marketing.Models.ViewModel;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Controllers
{
    [Area("Marketing")]
    public class UtilityController : BaseController
    {
        ILogger<UtilityController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public UtilityController(ApiClientFactory client, ILogger<UtilityController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        public IActionResult Index()
        {
            //ViewBag.Action = "Create";
            //return View("Add");
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
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMFActivation", $"{url}/GetMFActivation", "", ""));
                response = await _client.GetApiResponse<List<MFListModel>>($"{url}/GetMFActivation");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMFActivation", $"{url}/GetMFActivation", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Utility Activation Edit").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Utility Activation Add").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Marketing Utility Activation Delete").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, isAdd = response.IsAdd, isEdit = response.IsEdit, isDelete = response.IsDelete });
        }

        public async Task<IActionResult> GetUtilityOutlet(string mode)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            List<MFOutlet> listMFOutlet = new List<MFOutlet>();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMFOutlet", $"{url}/GetMFOutlet/{mode}", "", ""));
                if (mode == "Rent")
                {
                    response = await _client.GetApiResponse<List<MFOuletRentModel>>($"{url}/GetMFOutlet/{mode}");
                    if (response.Data is List<MFOuletRentModel>)
                    {
                        List<MFOuletRentModel> listOuletRent = (List<MFOuletRentModel>)response.Data;
                        foreach (var item in listOuletRent)
                        {
                            MFOutlet mfOutlet = new MFOutlet();
                            mfOutlet.OrderNumber = item.PSMNumber;
                            mfOutlet.Location = item.LocationMap;
                            mfOutlet.Square = item.Square.ToString();
                            mfOutlet.OutletName = item.OutletName;
                            mfOutlet.UnitOwner = item.UnitOwner;
                            mfOutlet.TenantOwner = item.TenantOwner;
                            mfOutlet.Status = item.Status;
                            mfOutlet.Details = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(item)));

                            listMFOutlet.Add(mfOutlet);
                        }
                    }
                }
                else
                {
                    response = await _client.GetApiResponse<List<MFOuletSalesModel>>($"{url}/GetMFOutlet/{mode}");
                    if (response.Data is List<MFOuletSalesModel>)
                    {
                        List<MFOuletSalesModel> listOuletSales = (List<MFOuletSalesModel>)response.Data;
                        foreach (var item in listOuletSales)
                        {
                            MFOutlet mfOutlet = new MFOutlet();
                            mfOutlet.OrderNumber = item.OrderNumber;
                            mfOutlet.Location = item.LocationMap;
                            mfOutlet.Square = item.Square.ToString();
                            mfOutlet.OutletName = item.OutletName;
                            mfOutlet.UnitOwner = item.UnitOwner;
                            mfOutlet.Details = Convert.ToBase64String(Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(item)));

                            listMFOutlet.Add(mfOutlet);
                        }
                    }
                }
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMFOutlet", $"{url}/GetMFOutlet/{mode}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = listMFOutlet, status = sts, message = msg });
        }

        public async Task<IActionResult> GetParamTenantOwner(int plnNode, int pamNode, int gasNode, Guid sourceId, string sourceCode)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            List<ParamTenantMgt> listParamTenantMgt = new List<ParamTenantMgt>();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetParamTenantMgt", $"{url}/GetParamTennantMgt?plnNode={plnNode}&pamNode={pamNode}&gasNode={gasNode}&sourceId={sourceId}&sourceCode={sourceCode}", "", ""));

                response = await _client.GetApiResponse<List<ParamTenantMgt>>($"{url}/GetParamTenantMgt?plnNode={plnNode}&pamNode={pamNode}&gasNode={gasNode}&sourceId={sourceId}&sourceCode={sourceCode}");

                logger.LogInformation(LogLibrary.Logging_Debug_End("GetParamTenantMgt", $"{url}/GetParamTennantMgt?plnNode={plnNode}&pamNode={pamNode}&gasNode={gasNode}&sourceId={sourceId}&sourceCode={sourceCode}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                listParamTenantMgt = (List<ParamTenantMgt>)response.Data;

                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = listParamTenantMgt, status = sts, message = msg });
        }

        public async Task<IActionResult> Details(string id, string code)
        {
            ViewTenantMgtRentSales TenantMgt = new ViewTenantMgtRentSales();
            ViewBag.Action = "view";
            ViewBag.Code = code;
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMFActivationBySourceId", $"{url}/GetMFActivationBySourceId", id, ""));
                if (code == "Rent")
                {
                    response = await _client.GetApiResponse<List<ViewTenantMgtRentModel>>($"{url}/GetMFActivationBySourceId/{id}?sourceCode={code}");

                    if (response.Data != null)
                    {
                        List<ViewTenantMgtRentModel> data = (List<ViewTenantMgtRentModel>)response.Data;
                        TenantMgt.tenantRent = data.Where(i => i.TenantMgtCode != "SC" && i.TenantMgtCode != "FL" && i.TenantMgtCode != "FL").ToList();
                    }
                }
                else if (code == "Sales")
                {
                    response = await _client.GetApiResponse<List<ViewTenantMgtSalesModel>>($"{url}/GetMFActivationBySourceId/{id}?sourceCode={code}");

                    if (response.Data != null)
                    {
                        List<ViewTenantMgtSalesModel> data = (List<ViewTenantMgtSalesModel>)response.Data;
                        TenantMgt.tenantSales = data.Where(i => i.TenantMgtCode != "SC" && i.TenantMgtCode != "PL" && i.TenantMgtCode != "FL").ToList();
                    }
                }
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMFActivationBySourceId", $"{url}/GetMFActivationBySourceId", id, "", response.Status, JsonConvert.SerializeObject(response.Data)));
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetMasterUnitById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", TenantMgt);
        }

        public IActionResult Create()
        {
            ViewBag.Action = "Create";
            return View("Add");
        }

        [HttpPost]
        public async Task<IActionResult> Create(List<TenantMgt> data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                foreach (var item in data)
                {
                    logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonMsTenantMgt/{user}", "", ""));
                    var model = JsonConvert.SerializeObject(item);
                    response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsTenantMgt/{user}", model);
                    logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonMsTenantMgt/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                    logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", "", ""));
                    response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", model);
                    logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                }

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Utility" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<IActionResult> Edit(string id, string code)
        {
            ViewTenantMgtRentSales TenantMgt = new ViewTenantMgtRentSales();
            ViewBag.Action = "Edit";
            ViewBag.Code = code;
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMFActivationBySourceId", $"{url}/GetMFActivationBySourceId", id, ""));
                if (code == "Rent")
                {
                    response = await _client.GetApiResponse<List<ViewTenantMgtRentModel>>($"{url}/GetMFActivationBySourceId/{id}?sourceCode={code}");

                    if (response.Data != null)
                    {
                        List<ViewTenantMgtRentModel> data = (List<ViewTenantMgtRentModel>)response.Data;
                        TenantMgt.tenantRent = data.Where(i => i.TenantMgtCode != "SC" && i.TenantMgtCode != "PL" && i.TenantMgtCode != "FL").ToList();
                    }
                }
                else if (code == "Sales")
                {
                    response = await _client.GetApiResponse<List<ViewTenantMgtSalesModel>>($"{url}/GetMFActivationBySourceId/{id}?sourceCode={code}");

                    if (response.Data != null)
                    {
                        List<ViewTenantMgtSalesModel> data = (List<ViewTenantMgtSalesModel>)response.Data;
                        TenantMgt.tenantSales = data.Where(i => i.TenantMgtCode != "SC" && i.TenantMgtCode != "PL" && i.TenantMgtCode != "FL").ToList();
                    }
                }
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMFActivationBySourceId", $"{url}/GetMFActivationBySourceId", id, "", response.Status, JsonConvert.SerializeObject(response.Data)));
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetMFActivationBySourceId", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", TenantMgt);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(List<TenantMgt> data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                Dictionary<string, dynamic> paymentMf = new Dictionary<string, dynamic>();
                foreach (var item in data)
                {
                    if (item.Action == "Create")
                    {
                        logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonMsTenantMgt/{user}", "", ""));
                        var model = JsonConvert.SerializeObject(item);
                        response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsTenantMgt/{user}", model);
                        logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonMsTenantMgt/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                        logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", "", ""));
                        response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", model);
                        logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                    }
                    else if (item.Action == "Edit")
                    {
                        logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", $"{url}/ExecuteSP/sp_upd_JsonMsTenantMgt/{user}", "", ""));
                        var model = JsonConvert.SerializeObject(item);
                        response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonMsTenantMgt/{user}", model);
                        logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", $"{url}/ExecuteSP/sp_upd_JsonMsTenantMgt/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                        logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", "", ""));
                        response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", model);
                        logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_upd_JsonUtilityUnitActive/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                    }
                    else if (item.Action == "Delete")
                    {
                        logger.LogInformation(LogLibrary.Logging_Debug_Start("Delete", $"{url}/DeleteMfItemByTenantMgtId/{item.TenantMgtId}/{user}", "", ""));
                        response = await _client.PostApiResponse<string>($"{url}/DeleteMfItemByTenantMgtId/{item.TenantMgtId}/{user}", "");
                        logger.LogInformation(LogLibrary.Logging_Debug_End("Delete", $"{url}/DeleteMfItemByTenantMgtId/{item.TenantMgtId}/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                    }

                    if (paymentMf.Count < 1)
                    {
                        paymentMf["SourceId"] = item.SourceId;
                        paymentMf["SourceCode"] = item.SourceCode;
                    }
                }

                sts = response.Status;
                msg = "Update mf activation data successfully";
                return Json(new { status = sts, message = msg, url = "/Marketing/Utility" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<IActionResult> Delete(string id)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Delete", $"{url}/DeleteMfByMfId/{id}/{user}", "", ""));
                response = await _client.PostApiResponse<string>($"{url}/DeleteMfByMfId/{id}/{user}", "");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Delete", $"{url}/DeleteMfByMfId/{id}/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Marketing/Utility" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }
    }
}
