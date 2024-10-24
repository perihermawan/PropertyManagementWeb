using Newtonsoft.Json;
using System;
using System.Data;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class NonStandardChargeItemModel
    {
        public Guid? FormId { get; set; }
        public Guid? RentId { get; set; }

        [JsonProperty("PeriodFrom")]
        public DateTime PeriodFrom { get; set; }

        [JsonProperty("PeriodTo")]
        public DateTime PeriodTo { get; set; }

        [JsonProperty("FormDescription")]
        public string FormDescription { get; set; }

        [JsonProperty("BasicAmount")]
        public double BasicAmount { get; set; }

        [JsonProperty("AdditionalAmount")]
        public double AdditionalAmount { get; set; }

        [JsonProperty("ChargeAmount")]
        public double ChargeAmount { get; set; }

        [JsonProperty("ChargeAmountInPeriod")]
        public double ChargeAmountInPeriod { get; set; }

        [JsonProperty("BasicAmountInc")]
        public double BasicAmountInc { get; set; }

        [JsonProperty("ChargeAmountInPeriodInc")]
        public double ChargeAmountInPeriodInc { get; set; }
        public DataRowState DataRowState { get; set; } = DataRowState.Unchanged;
    }
}
