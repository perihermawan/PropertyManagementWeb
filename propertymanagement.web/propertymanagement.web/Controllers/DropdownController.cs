using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using propertymanagement.web.Common;
using propertymanagement.web.Models.ViewModels;
using propertymanagement.web.ServiceAPI;

namespace propertymanagement.web.Controllers
{
    public class DropdownController : BaseController
    {
        ILogger<UserInfoController> logger;
        string url = ApiUrl.APIUrl;
        private readonly ApiClientFactory _client;
        public DropdownController(ApiClientFactory client, ILogger<UserInfoController> logger)
        {
            this.logger = logger;
            this._client = client;
        }
        public async Task<ActionResult> GetDDlChargeCode()
        {
            var getUrl = $"{url}/getddlchargecode";
            var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(model, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
        }

        public async Task<ActionResult> GetDDlEmployee(string dateFrom, string dateTo, string timeFrom, string timeTo)
        {
            var getUrl = $"{url}/getddlemployee/{dateFrom}/{dateTo}/{timeFrom}/{timeTo}";
            var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(model, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
        }

        public async Task<ActionResult> GetDDLTransportType()
        {
            List<ViewSelectListItem> listTransport = new List<ViewSelectListItem>();
            listTransport.Add(new ViewSelectListItem { Text = "Bus", Value = "1" });
            listTransport.Add(new ViewSelectListItem { Text = "Plane", Value = "2" });
            listTransport.Add(new ViewSelectListItem { Text = "Train", Value = "3" });

            //var getUrl = $"{url}/getddlemployee/{dateFrom}/{dateTo}/{timeFrom}/{timeTo}";
            //var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(listTransport, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
        }

        public async Task<ActionResult> GetDDLLeaveRequest()
        {
            List<ViewSelectListItem> listLeave = new List<ViewSelectListItem>();
            //listLeave.Add(new ViewSelectListItem { Text = "Annual Leave", Value = "1", OptionValue1 = "AAAA", OptionValue2 = "Y" });
            //listLeave.Add(new ViewSelectListItem { Text = "Sick Leave", Value = "2", OptionValue1 = "CCCC", OptionValue2 = "N" });
            //listLeave.Add(new ViewSelectListItem { Text = "2 Hour Leave", Value = "3", OptionValue1 = "AAAA", OptionValue2 = "N" });
            //listLeave.Add(new ViewSelectListItem { Text = "4 Hour Leave", Value = "4", OptionValue1 = "AAAA", OptionValue2 = "N" });
            //return Json(listLeave, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
            var getUrl = $"{url}/getddlleaverequest";
            var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(model, new JsonSerializerSettings { ContractResolver = new DefaultContractResolver() });
        }

        public async Task<ActionResult> GetDDLCompany()
        {
            List<ViewSelectListItem> listLeave = new List<ViewSelectListItem>();
            var getUrl = $"{url}/getddlcompany";
            var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(model);
        }

        public async Task<ActionResult> GetDDLRoles()
        {
            List<ViewSelectListItem> listLeave = new List<ViewSelectListItem>();
            var getUrl = $"{url}/getddlroles?appName=Marketing";
            var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(model);
        }

        public async Task<ActionResult> GetDDLParam(string paramCode)
        {
            List<ViewSelectListItem> listLeave = new List<ViewSelectListItem>();
            var getUrl = $"{url}/getddlparam?paramCode=" + paramCode;
            var model = await _client.Get<List<ViewSelectListItem>>(getUrl) ?? new List<ViewSelectListItem>();
            return Json(model);
        }
    }
}