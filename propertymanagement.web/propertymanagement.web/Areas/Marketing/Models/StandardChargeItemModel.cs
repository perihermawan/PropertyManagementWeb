using Newtonsoft.Json;
using System;
using System.Data;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class StandardChargeItemModel
    {
        [JsonProperty("formId")]
        public Guid? formId { get; set; }

        [JsonProperty("rentId")]
        public string rentId { get; set; }

        [JsonProperty("periodFrom")]
        public string periodFrom { get; set; }

        [JsonProperty("periodTo")]
        public string periodTo { get; set; }

        [JsonProperty("periodeFrom")]
        public string periodeFrom { get; set; }

        [JsonProperty("periodeTo")]
        public string periodeTo { get; set; }

        [JsonProperty("periode")]
        public string periode { get; set; }

        [JsonProperty("formDescription")]
        public string formDescription { get; set; }

        [JsonProperty("basicAmount")]
        public string basicAmount { get; set; }

        [JsonProperty("basicAmountInc")]
        public string basicAmountInc { get; set; }

        [JsonProperty("chargeAmountInPeriod")]
        public string chargeAmountInPeriod { get; set; }

        [JsonProperty("chargeAmountInPeriodInc")]
        public string chargeAmountInPeriodInc { get; set; }

        [JsonProperty("remark")]
        public string remark { get; set; }
    }
}
