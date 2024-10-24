using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using propertymanagement.web.Areas.Master.Models;
using propertymanagement.web.Areas.Master.Models.DTO;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.Infrastructure;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using propertymanagement.web.Areas.Master.Models.ViewModel;


namespace propertymanagement.web.Areas.Master.Controllers
{
    [Area("Master")]
    public class UserManagementController : BaseController
    {
        ILogger<UserManagementController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public UserManagementController(ApiClientFactory client, ILogger<UserManagementController> logger)
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
            List<User> userlist = new List<User>();
            User user = new User();
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Get Data User All", "SYSTEM", url, ""));
                response = await _client.GetApiResponse<List<UserListModel>>($"{url}/GetAllUser");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Get Data User All", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit User").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add User").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete User").ToList().Count > 0 ? "Yes" : "No";
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        [HttpGet]
        public async Task<IActionResult> GetDataMenuAll(string userid)
        {
            List<Employee> userlist = new List<Employee>();
            User user = new User();
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Get Data Menu All", "SYSTEM", url, ""));
                response = await _client.GetApiResponse<List<ViewAccessMenuModel>>($"{url}/GetUserAccessAll/{userid}");

                logger.LogInformation(LogLibrary.Logging_Debug_End("Get Data Menu All", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg });
        }

        public async Task<IActionResult> GetDataEmployeeAll()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Get Data Employee All", $"{url}/GetMasterEmployee", "", ""));
                response = await _client.GetApiResponse<List<ViewEmployeeModel>>($"{url}/GetMasterEmployee");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Get Data Employee All", $"{url}/GetMasterEmployee", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg, IsAdd = response.IsAdd, IsEdit = response.IsEdit, IsDelete = response.IsDelete });
        }

        public ActionResult Create()
        {
            UserListModel Model = new UserListModel();
            ViewBag.Action = "Create";
            return View("Add", Model);
        }

        [HttpGet]
        public async Task<IActionResult> Edit([FromQuery]string id)
        {
            UserListModel user = new UserListModel();
            ViewBag.Action = "edit";
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", "SYSTEM", url, ""));
                response = await _client.GetApiResponse<UserListModel>($"{url}/GetUserById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));
                if (response.Data != null)
                {
                    user = ((UserListModel)response.Data);
                }
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return View(user);
        }

        public async Task<IActionResult> EditPassword()
        {
            UserListModel user = new UserListModel();
            var userId = SessionManager.UserId;
            ViewBag.Action = "editPassword";
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Edit", "SYSTEM", url, ""));
                response = await _client.GetApiResponse<UserListModel>($"{url}/GetUserById/{userId}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Edit", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));
                if (response.Data != null)
                {
                    user = ((UserListModel)response.Data);
                }
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return View(user);
        }

        public async Task<IActionResult> Details(string id)
        {
            UserListModel user = new UserListModel();
            ViewBag.Action = "view";
            string msg = "";
            string sts = "";
            var response = new ApiResponse();

            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("Detail User", "SYSTEM", url, ""));
                response = await _client.GetApiResponse<UserListModel>($"{url}/GetUserById/{id}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("Detail User", "SYSTEM", url, response.Status, "", JsonConvert.SerializeObject(response.Data)));

                if (response.Data != null)
                {
                    user = ((UserListModel)response.Data);
                }
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                logger.LogError(LogLibrary.Logging("Error", "GetUserById", id.ToString(), "", e.Message, ""));
            }
            return View("Edit", user);
        }

        [HttpPost]
        public async Task<IActionResult> Edit(UserManagement data)
        {
            
            var userId = SessionManager.UserId;
            string msg = "";
            string actionDesc = "";
            string sts = "";
            string spName = "";
            var response = new ApiResponse();
            try
            {
                if (data.UserId==0)
                {
                    spName = "sp_ins_JsonMsUser";
                    actionDesc = "Add Data User";
                }
                else
                {
                    spName = "sp_upd_JsonMsUser";
                    actionDesc = "Update Data User";
                }
                //data.Password = Encryptspa.Common.Encrypt(data.Password);
                var pData = JsonConvert.SerializeObject(data);
                logger.LogInformation(LogLibrary.Logging_Debug_Start(actionDesc, "SYSTEM", url + "," + JsonConvert.SerializeObject(data), ""));
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/{spName}/{userId}", pData);
                msg = response.Message;
                sts = response.Status;
                logger.LogInformation(LogLibrary.Logging_Debug_End(actionDesc, "SYSTEM", url + ", " + JsonConvert.SerializeObject(data), sts, response.Data.ToString(), JsonConvert.SerializeObject(response.Data)));

            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = data, status = sts, message = msg, url = "/Master/UserManagement" });//, url = Url.Action(nameof(Index))
        }

        [HttpPost]
        public async Task<IActionResult> EditPassword(editpasswordmodel data)
        {

            var userId = SessionManager.UserId;
            string msg = "";
            string actionDesc = "";
            string sts = "";
            string spName = "";
            var response = new ApiResponse();
            try
            {
                data.UserId = userId;
                //data.Password = Encryptspa.Common.Encrypt(data.Password);
                var pData = JsonConvert.SerializeObject(data);
                logger.LogInformation(LogLibrary.Logging_Debug_Start(actionDesc, "SYSTEM", url + "," + JsonConvert.SerializeObject(data), ""));
                response = await _client.PostApiResponse<object>($"{url}/EditPassword", data);
                msg = response.Message;
                sts = response.Status;
                //logger.LogInformation(LogLibrary.Logging_Debug_End(actionDesc, "SYSTEM", url + ", " + JsonConvert.SerializeObject(data), sts, response.Data.ToString(), JsonConvert.SerializeObject(response.Data)));

            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = data, status = sts, message = msg, url = "/Authentication/logout" });//, url = Url.Action(nameof(Index))
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserManagement data)
        {
            
            var userId = SessionManager.UserId;
            string msg = "";
            string actionDesc = "";
            string sts = "";
            string spName = "";
            var response = new ApiResponse();
            try
            {
                if (data.UserId == 0)
                {
                    spName = "sp_ins_JsonMsUser";
                    actionDesc = "Add Data User";
                }
                else
                {
                    spName = "sp_upd_JsonMsUser";
                    actionDesc = "Update Data User";
                }
                data.Password = Encryptspa.Common.Encrypt(data.Password);
                var pData = JsonConvert.SerializeObject(data);
                logger.LogInformation(LogLibrary.Logging_Debug_Start(actionDesc, "SYSTEM", url + "," + JsonConvert.SerializeObject(data), ""));
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/{spName}/{userId}", pData);
                msg = response.Message;
                sts = response.Status;
                logger.LogInformation(LogLibrary.Logging_Debug_End(actionDesc, "SYSTEM", url + ", " + JsonConvert.SerializeObject(data), sts, response.Data.ToString(), JsonConvert.SerializeObject(response.Data)));

            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = data, status = sts, message = msg, url = "/Master/UserManagement" });//, url = Url.Action(nameof(Index))
        }

        [HttpPost]
        public async Task<IActionResult> onDelete(string dataParam)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                response = await _client.PostApiResponse<string>($"{url}/ExecuteSP/sp_del_JsonMsUser/{user}", dataParam);

                sts = response.Status;
                msg = response.Message;
                return Json(new { status = sts, message = msg, url = "/Master/UserManagement" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> ValidateOldPassword(string password)
        {
            string msg = "";
            if (SessionManager.Password != password)
            {
                msg = "Wrong Old Password";
            }
            return Json(new { message = msg });

        }

    }
}
