using System.Collections.Generic;
using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace propertymanagement.web.Areas.Marketing.Models.DTO
{
    public class NonStandardChargeRequest
    {
        [JsonProperty("rentId")]
        public string rentId { get; set; }

        [JsonProperty("psmNumber")]
        public string psmNumber { get; set; }

        [JsonProperty("rentAmount")]
        public string rentAmount { get; set; }

        [JsonProperty("locationMap")]
        public string locationMap { get; set; }

        [JsonProperty("outstandingAmount")]
        public string outstandingAmount { get; set; }

        [JsonProperty("square")]
        public string square { get; set; }

        [JsonProperty("installments")]
        public string installments { get; set; }

        [JsonProperty("outletName")]
        public string outletName { get; set; }

        [JsonProperty("chargeDateFrom")]
        public DateTime chargeDateFrom { get; set; }

        [JsonProperty("unitOwner")]
        public string unitOwner { get; set; }

        [JsonProperty("chargeDateTo")]
        public string chargeDateTo { get; set; }

        [JsonProperty("tenantOwner")]
        public string tenantOwner { get; set; }

        [JsonProperty("remarksRentCharge")]
        public string remarksRentCharge { get; set; }

        [JsonProperty("items")]
        public List<NonStandardChargeItemModel> items { get; set; }
    }
}
