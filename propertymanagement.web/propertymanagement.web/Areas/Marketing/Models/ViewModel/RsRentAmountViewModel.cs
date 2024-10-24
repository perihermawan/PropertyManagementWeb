using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class RsRentAmountViewModel
    {
        public Guid? RentId { get; set; }
        public string KsmNumber { get; set; }
        public string LocationMap { get; set; }
        public string OutletName { get; set; }
        public string TenantOwner { get; set; }
        public decimal? OutstandingAmount { get; set; }
        public int Installments { get; set; }
        public string ChargeType { get; set; }
    }
}
