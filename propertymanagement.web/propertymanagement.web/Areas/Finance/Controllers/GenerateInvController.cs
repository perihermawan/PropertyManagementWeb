using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using propertymanagement.web.Areas.Finance.Models.ViewModel;
using propertymanagement.web.Common;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Session;
using System;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Finance.Controllers
{
    [Area("Finance")]
    public class GenerateInvController : Controller
    {
        ILogger<GenerateInvController> logger;

        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public GenerateInvController(ApiClientFactory client, ILogger<GenerateInvController> logger)
        {
            this.logger = logger;
            _client = client;
        }

        // GET: GenerateInvController
        public async Task<IActionResult> Index()
        {
            var LastGenerateDateRent = await GetLastGenerateDate("Rent");
            var LastGenerateDateMF = await GetLastGenerateDate("SCUTL");
            var GracePeriodRent = await GetGracePeriod("Rent");
            var GracePeriodMF = await GetGracePeriod("MF");

            ViewBag.GracePeriodRent = GracePeriodRent.Data;
            ViewBag.GracePeriodMF = GracePeriodMF.Data;
            ViewBag.LastGenerateDateRent = LastGenerateDateRent.Data;
            ViewBag.LastGenerateDateMF = LastGenerateDateMF.Data;

            return View();
        }

        [HttpPost]
        public async Task<IActionResult> GenerateInvoice([FromBody] InvoiceViewModel data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GenerateInvoice", $"{url}/GenerateInvoice", "", ""));
                response = await _client.PostApiResponse<string>($"{url}/GenerateInvoice", data);
                logger.LogInformation(LogLibrary.Logging_Debug_End("GenerateInvoice", $"{url}/GenerateInvoice", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { data = response.Data, status = sts, message = msg, url = "" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> SaveGracePeriod([FromBody] GracePeriodViewModel data)
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("SaveGracePeriod", $"{url}/SaveGracePeriod", "", ""));

                response = await _client.PostApiResponse<string>($"{url}/SaveGracePeriod", data);
                logger.LogInformation(LogLibrary.Logging_Debug_End("SaveGracePeriod", $"{url}/SaveGracePeriod", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { data = response.Data, status = sts, message = msg, url = "" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> BackupDatabase()
        {
            var user = SessionManager.UserId;
            var response = new ApiResponse();
            string msg = "";
            string sts = "";
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("BackupDatabase", $"{url}/BackupDatabase", "", ""));

                response = await _client.PostApiResponse<string>($"{url}/BackupDatabase");
                logger.LogInformation(LogLibrary.Logging_Debug_End("BackupDatabase", $"{url}/BackupDatabase", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));

                sts = response.Status;
                msg = response.Message;
                return Json(new { data = response.Data, status = sts, message = msg, url = "" });
            }
            catch (Exception ex)
            {
                return Json(new { status = "false", message = ex.Message });
            }
        }

        public async Task<ApiResponse> GetLastGenerateDate(string option)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetLastGenerateDate", $"{url}/GetLastGenerateDate?option={option}", "", ""));
                response = await _client.GetApiResponse<LastGenerateDateOutputModel>($"{url}/GetLastGenerateDate?option={option}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetLastGenerateDate", $"{url}/GetLastGenerateDate?option={option}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }

            return response;
        }

        public async Task<ApiResponse> GetGracePeriod(string option)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetGracePeriod", $"{url}/GetGracePeriod?option={option}", "", ""));
                response = await _client.GetApiResponse<GracePeriodOutputModel>($"{url}/GetGracePeriod?option={option}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetGracePeriod", $"{url}/GetGracePeriod?option={option}", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
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
