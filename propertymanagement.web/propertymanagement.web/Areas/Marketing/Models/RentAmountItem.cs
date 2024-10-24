using System;
using System.Data;
using System.Text.Json.Serialization;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentAmountItem
    {
        public Guid? RentAmountId { get; set; }
        public Guid? RentId { get; set; }
        [JsonPropertyName("PeriodFrom")]
        public int PeriodFrom { get; set; }
        [JsonPropertyName("PeriodTo")]
        public int PeriodTo { get; set; }
        [JsonPropertyName("PeriodMonth")]
        public int PeriodMonth { get; set; }
        [JsonPropertyName("PerMonthPerM2Amount")]
        public decimal PerMonthPerM2Amount { get; set; }
        [JsonPropertyName("PeriodAmount")]
        public decimal PeriodAmount { get; set; }
        public bool? isDeleted { get; set; }

        public DataRowState DataRowState { get; set; } = DataRowState.Unchanged;
    }
}
