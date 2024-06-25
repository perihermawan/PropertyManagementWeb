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

namespace propertymanagement.web.Areas.Master.Controllers
{
    [Area("Master")]
    public class EmployeeController : BaseController
    {
        ILogger<EmployeeController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public EmployeeController(ApiClientFactory client, ILogger<EmployeeController> logger)
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
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetMasterEmployee", $"{url}/GetMasterEmployee", "", ""));
                response = await _client.GetApiResponse<List<ViewEmployeeModel>>($"{url}/GetMasterEmployee");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetMasterEmployee", $"{url}/GetMasterEmployee", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Employee").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Employee").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Employee").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        public ActionResult Create()
        {
            ViewBag.Action = "Create";
            return View("Add");
        }

        [HttpPost]
        public async Task<IActionResult> Create(Employee data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                if (!string.IsNullOrEmpty(data.EmployeeDate))
                {
                    data.EmployeeDate = data.EmployeeDate.Split("-")[2] + "-" + data.EmployeeDate.Split("-")[1] + "-" + data.EmployeeDate.Split("-")[0];
                }
                if (!string.IsNullOrEmpty(data.BirthDate))
                {
                    data.BirthDate = data.BirthDate.Split("-")[2] + "-" + data.BirthDate.Split("-")[1] + "-" + data.BirthDate.Split("-")[0];
                }
                if (!string.IsNullOrEmpty(data.ResignDate))
                {
                    data.ResignDate = data.ResignDate.Split("-")[2] + "-" + data.ResignDate.Split("-")[1] + "-" + data.ResignDate.Split("-")[0];
                }

                logger.LogInformation(LogLibrary.Logging_Debug_Start("Create", $"{url}/ExecuteSP/sp_ins_JsonMsEmployee/{user}", "", ""));

                var model = JsonConvert.SerializeObject(data);

                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_ins_JsonMsEmployee/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Create", $"{url}/ExecuteSP/sp_ins_JsonMsMapAndUnit/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Employee" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> Edit(int id)
        {
            Employee employee = new Employee();
            ViewBag.Action = "Edit";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetEmployeeById", $"{url}/GetEmployeeById", id.ToString(), ""));
                response = await _client.GetApiResponse<Employee>($"{url}/GetEmployeeById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetEmployeeById", $"{url}/GetEmployeeById", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    employee = ((Employee)response.Data);
                }
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetMasterEmployeeById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", employee);
        }

        public async Task<IActionResult> Edit(Employee data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                if (!string.IsNullOrEmpty(data.EmployeeDate))
                {
                    data.EmployeeDate = data.EmployeeDate.Split("-")[2] + "-" + data.EmployeeDate.Split("-")[1] + "-" + data.EmployeeDate.Split("-")[0];
                }
                if (!string.IsNullOrEmpty(data.BirthDate))
                {
                    data.BirthDate = data.BirthDate.Split("-")[2] + "-" + data.BirthDate.Split("-")[1] + "-" + data.BirthDate.Split("-")[0];
                }
                if (!string.IsNullOrEmpty(data.ResignDate))
                {
                    data.ResignDate = data.ResignDate.Split("-")[2] + "-" + data.ResignDate.Split("-")[1] + "-" + data.ResignDate.Split("-")[0];
                }

                logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", $"{url}/ExecuteSP/sp_upd_JsonMsEmployee/{user}", "", ""));
                var model = JsonConvert.SerializeObject(data);
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_upd_JsonMsEmployee/{user}", model);
                logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", $"{url}/ExecuteSP/sp_upd_JsonMsEmployee/{user}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Employee" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<IActionResult> Details(string id)
        {
            Employee employee = new Employee();
            ViewBag.Action = "view";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetEmployeeById", $"{url}/GetEmployeeById", id.ToString(), ""));
                response = await _client.GetApiResponse<Employee>($"{url}/GetEmployeeById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetEmployeeById", $"{url}/GetEmployeeById", id.ToString(), "", response.Status, JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    employee = ((Employee)response.Data);
                }
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetEmployeeById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", employee);
        }

        public async Task<IActionResult> Delete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonMsEmployee/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/Employee" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
            
        }
    }
}
