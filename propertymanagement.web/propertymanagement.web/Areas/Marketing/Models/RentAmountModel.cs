using Microsoft.Extensions.Logging;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Data;
using System;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentAmountModel
    {
        public Guid RentId { get; set; }
        public string KsmNumber { get; set; }
        public string Location { get; set; }
        public string OutletName { get; set; }
        public string TenantName { get; set; }
        public decimal Outstanding { get; set; }
        public int Installments { get; set; }
        public string ChargeType { get; set; }
    }
}
