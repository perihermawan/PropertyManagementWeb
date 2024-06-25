using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Newtonsoft.Json;

using propertymanagement.web.Common;
using propertymanagement.web.Models.Master;
using propertymanagement.web.ServiceAPI;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Controllers
{
    public class MasterController : BaseController
    {
        ILogger<MasterController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;

        public MasterController(ApiClientFactory client, ILogger<MasterController> logger)
        {
            this.logger = logger;
            this._client = client;
        }

        [HttpPost]
        public async Task<IActionResult> GetPrmOther(string paramCode)
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetPrmOthers", $"{url}/GetPrmOthers", paramCode, ""));
                response = await _client.GetApiResponse<List<ParamOthers>>($"{url}/GetPrmOthers/{paramCode}");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetPrmOthers", $"{url}/GetPrmOthers", "", paramCode, response.Status, JsonConvert.SerializeObject(response.Data)));
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
        public async Task<IActionResult> GetBuilding()
        {
            string msg = "";
            string sts = "";
            var response = new ApiResponse();
            try
            {
                logger.LogInformation(LogLibrary.Logging_Debug_Start("GetBuilding", $"{url}/GetBuilding", "", ""));
                response = await _client.GetApiResponse<List<Building>>($"{url}/GetBuilding");
                logger.LogInformation(LogLibrary.Logging_Debug_End("GetBuilding", $"{url}/GetBuilding", "", "", response.Status, JsonConvert.SerializeObject(response.Data)));
                msg = response.Message;
                sts = response.Status;
            }
            catch (Exception e)
            {
                msg = e.Message;
            }
            return Json(new { data = response.Data, status = sts, message = msg });
        }
    }
}
