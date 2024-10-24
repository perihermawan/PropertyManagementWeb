using System;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentChargeNonStandardModel
    {
        public Guid RentId { get; set; }
        public string KsmNumber { get; set; }
        public string Location { get; set; }
        public decimal RentSquare { get; set; }
        public string OutletName { get; set; }
        public string TenantName { get; set; }
        public DateTime? ChargeDateFrom { get; set; }
        public DateTime? ChargeDateTo { get; set; }
    }
}
