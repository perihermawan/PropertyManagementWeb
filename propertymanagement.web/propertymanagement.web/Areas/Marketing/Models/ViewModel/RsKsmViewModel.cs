using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class RsKsmViewModel
    {
        public Guid? RentId { get; set; }
        public string KsmNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal? Square { get; set; }
        public string OutletName { get; set; }
        public string TenantOwner { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Status { get; set; }
    }
}
