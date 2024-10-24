using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class MFOuletSalesModel
    {
        public Guid SalesId { get; set; }
        public Guid? OutletId { get; set; }
        public Guid? OwnerId { get; set; }
        public DateTime? SoldDate { get; set; }
        public decimal? Square { get; set; }
        public DateTime? HandOverDate { get; set; }
        public string? MarketingName { get; set; }
        public string? CurrencyCd { get; set; }
        public decimal? CurrencyRate { get; set; }
        public decimal? SalesAmount { get; set; }
        public decimal? SalesTax { get; set; }
        public decimal? TaxPercentage { get; set; }
        public decimal? StampAmount { get; set; }
        public string? Remark { get; set; }
        public DateTime? OrderDate { get; set; }
        public string? OrderNumber { get; set; }
        public DateTime? PpjbDate { get; set; }
        public string? PpjbNumber { get; set; }
        public DateTime? CertificateDate { get; set; }
        public string? CertificateNumber { get; set; }
        public bool TitipSewaFlag { get; set; }
        public Guid? StatusId { get; set; }
        public DateTime? PeriodStart { get; set; }
        public DateTime? PeriodEnd { get; set; }
        public DateTime? CancelDate { get; set; }
        public int? PeriodTime { get; set; }
        public bool IsFoodCourt { get; set; }
        public Guid? OutletTypeId { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string? DeleteUser { get; set; }
        public Guid? GroupingId { get; set; }
        public string? VirtualAccount { get; set; }
        public string LocationMap { get; set; }
        public string OutletName { get; set; }
        public string UnitOwner { get; set; }
        public string TenantOwner { get; set; }
        public string OutletType { get; set; }
        public bool IsDisplayArea { get; set; }
        public int PamNode { get; set; }
        public int GasNode { get; set; }
        public int PlnNode { get; set; }
        public decimal TotPower { get; set; }
    }
}
