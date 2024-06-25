using Microsoft.Extensions.Logging;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Data;
using System;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentAmountModel
    {
        public Guid rentId { get; set; }
        public string ksmNumber { get; set; }
        public string location { get; set; }
        public string outletName { get; set; }
        public string tenantName { get; set; }
        public decimal outstanding { get; set; }
        public int installments { get; set; }
        public string chargeType { get; set; }
    }
}
