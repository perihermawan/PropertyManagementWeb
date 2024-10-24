using Newtonsoft.Json;

using System;
using System.ComponentModel;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class TenantMgt
    {
        [JsonProperty(PropertyName = "tenantMgtId")]
        public Guid TenantMgtId { get; set; }

        [JsonProperty(PropertyName = "prmTenantMgtId")]
        public int PrmTenantMgtId { get; set; }

        [JsonProperty(PropertyName = "tenantMgtCode")]
        public string TenantMgtCode { get; set; }

        [JsonProperty(PropertyName = "sourceId")]
        public Guid? SourceId { get; set; }

        [JsonProperty(PropertyName = "sourceCode")]
        public string SourceCode { get; set; }

        [JsonProperty(PropertyName = "subscriptionFeeAmount")]
        public decimal? SubscriptionFeeAmount { get; set; }

        [DefaultValue(0.00)]
        [JsonProperty(PropertyName = "maintenanceFeeAmount")]
        public decimal MaintenanceFeeAmount { get; set; }

        [DefaultValue(0.00)]
        [JsonProperty(PropertyName = "usageFee1Amount")]
        public decimal UsageFee1Amount { get; set; }

        [DefaultValue(0.00)]
        [JsonProperty(PropertyName = "usageFee2Amount")]
        public decimal UsageFee2Amount { get; set; }

        [DefaultValue(0.00)]
        [JsonProperty(PropertyName = "ppjPercentage")]
        public decimal PpjPercentage { get; set; }

        [DefaultValue(0.00)]
        [JsonProperty(PropertyName = "admPercentage")]
        public decimal AdmPercentage { get; set; }

        [JsonProperty(PropertyName = "discPercentage")]
        public decimal? DiscPercentage { get; set; }

        [JsonProperty(PropertyName = "taxPercentage")]
        public decimal? TaxPercentage { get; set; }

        [DefaultValue(0.00)]
        [JsonProperty(PropertyName = "minimumAmount")]
        public decimal MinimumAmount { get; set; }

        [JsonProperty(PropertyName = "chargeDateFrom")]
        public DateTime? ChargeDateFrom { get; set; }

        [JsonProperty(PropertyName = "chargeEvery")]
        public int? ChargeEvery { get; set; }

        [JsonProperty(PropertyName = "chargeToId")]
        public Guid? ChargeToId { get; set; }

        [JsonProperty(PropertyName = "chargeAmountOther")]
        public decimal ChargeAmountOther { get; set; }

        [JsonProperty(PropertyName = "isLumpSump")]
        public bool IsLumpSump { get; set; }

        [JsonProperty(PropertyName = "createDate")]
        public DateTime CreateDate { get; set; }

        [JsonProperty(PropertyName = "createUser")]
        public string CreateUser { get; set; }

        [JsonProperty(PropertyName = "type")]
        public int Type { get; set; }

        [JsonProperty(PropertyName = "action")]
        public string? Action { get; set; }
    }
}
