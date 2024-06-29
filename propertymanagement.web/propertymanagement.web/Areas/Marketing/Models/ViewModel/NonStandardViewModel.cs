using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class NonStandardViewModel
    {
        public Guid? rentId { get; set; }
        public string? ksmNumber { get; set; }
        public string? locationMap { get; set; }
        public decimal? square { get; set; }
        public string? outletName { get; set; }
        public string? tenantOwner { get; set; }
        public DateTime chargeDateFrom { get; set; }
        public DateTime chargeDateTo { get; set; }
    }
}
