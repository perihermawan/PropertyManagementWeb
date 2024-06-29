using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Marketing.Models;
using propertymanagement.web.Common;
using propertymanagement.web.Controllers;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System.Collections.Generic;
using System.Security.Policy;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Logging;
using propertymanagement.web.Areas.Master.Controllers;
using System.Linq;
using Microsoft.AspNetCore.Http;
using propertymanagement.web.Areas.Master.Models.DTO;
using propertymanagement.web.Areas.Master.Models.ViewModel;
using propertymanagement.web.Areas.Master.Models;
using propertymanagement.web.Areas.Marketing.Models.ViewModel; 


namespace propertymanagement.web.Areas.Marketing.Controllers
{
    [Area("Marketing")]
    public class NonStandardController : BaseController
    {
        ILogger<NonStandardController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public NonStandardController(ApiClientFactory client, ILogger<NonStandardController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        // GET: NonStandardController
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
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetNonStandardList", $"{url}/GetNonStandardList", "", ""));
                response = await _client.GetApiResponse<List<NonStandardViewModel>>($"{url}/GetNonStandardList");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetNonStandardList", $"{url}/GetNonStandardList", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
                response.IsEdit = SessionManager.PermissionSession.Where(a => a.Description == "Edit Rent Amount").ToList().Count > 0 ? "Yes" : "No";
                response.IsAdd = SessionManager.PermissionSession.Where(a => a.Description == "Add Rent Amount").ToList().Count > 0 ? "Yes" : "No";
                response.IsDelete = SessionManager.PermissionSession.Where(a => a.Description == "Delete Rent Amount").ToList().Count > 0 ? "Yes" : "No";
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
        public async Task<IActionResult> Create(NonStandardModel data) // Use NonStandardModel
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";

            try
            {
                data.formId = Guid.NewGuid();
                data.rentId = Guid.NewGuid();
                data.ksmNumber ="12312";
                // Access the _rowState property
                var model = JsonConvert.SerializeObject(data);


                logger.LogInformation(LogLibrary.Logging_Debug_Start("Ini", model, "", ""));
               var test =  await _client.PostApiResponse<string>($"{url}/CreateNonStandardDetail/{user}", model);
                var hua = JsonConvert.SerializeObject(test);

                // Serialize the data object to JSON

                // Log the serialized object

                // Perform your logic here (e.g., saving the data to the database)

                logger.LogInformation(LogLibrary.Logging_Debug_End("Ini", "test","", "", "", ""));

               
                // Return JSON response with status and message
                return Json(new { data= test, status = sts, message = msg, url = "/Master/Unit" });
            }
            catch (Exception ex)
            {
                // Log the exception
                logger.LogError(ex, "An error occurred while creating the NonStandardModel data");

                // Return JSON response with error message
                return Json(new { status = "false", message = ex.Message });
            }
        }
        

    }
    
}
