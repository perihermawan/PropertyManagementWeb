using System;
using System.Data;
using System.Text.Json.Serialization;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class DpItem
    {
        public Guid? DownPaymentId { get; set; }

        public Guid? RentId { get; set; }

        [JsonPropertyName("PeriodDp")]
        public int PeriodDp { get; set; }

        [JsonPropertyName("DpAmount")]
        public decimal DpAmount { get; set; }

        [JsonPropertyName("DpPPN")]
        public decimal DpPPN { get; set; }

        [JsonPropertyName("DpTotal")]
        public decimal DpTotal { get; set; }

        [JsonPropertyName("DpDate")]
        public DateTime DpDate { get; set; }
        public DataRowState DataRowState { get; set; } = DataRowState.Unchanged;
    }
}
