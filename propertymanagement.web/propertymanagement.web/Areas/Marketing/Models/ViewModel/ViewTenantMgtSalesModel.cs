using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class ViewTenantMgtSalesModel
    {
        public Guid? TenantMgtId { get; set; }
        public int PrmTenantMgtId { get; set; }
        public string TenantMgtCode { get; set; }
        public Guid SourceId { get; set; }
        public string? SourceCode { get; set; }
        public decimal SubscriptionFeeAmount { get; set; }
        public decimal MaintenanceFeeAmount { get; set; }
        public decimal UsageFee1Amount { get; set; }
        public decimal UsageFee2Amount { get; set; }
        public decimal PpjPercentage { get; set; }
        public decimal AdmPercentage { get; set; }
        public decimal DiscPercentage { get; set; }
        public decimal DiscAmount { get; set; }
        public decimal TaxPercentage { get; set; }
        public DateTime? ChargeDateFrom { get; set; }
        public int ChargeEvery { get; set; }
        public Guid ChargeToId { get; set; }
        public decimal ChargeAmountOther { get; set; }
        public int IsLumpSump { get; set; }
        public int IsDeleted { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string? DeleteUser { get; set; }
        public decimal MinimumAmount { get; set; }
        public int Type { get; set; }
        public Guid SalesId { get; set; }
        public Guid OutletId { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime SoldDate { get; set; }
        public decimal Square { get; set; }
        public DateTime? HandOverDate { get; set; }
        public string MarketingName { get; set; }
        public string CurrencyCd { get; set; }
        public decimal SalesAmount { get; set; }
        public decimal SalesTax { get; set; }
        public decimal? TaxPersentage { get; set; }
        public decimal StampAmount { get; set; }
        public string? Remark { get; set; }
        public DateTime OrderDate { get; set; }
        public decimal OrderNumber { get; set; }
        public DateTime? PpbjDate { get; set; }
        public string? PpbjNumber { get; set; }
        public DateTime? CertificateDate { get; set; }
        public string? CertificatNumber { get; set; }
        public int? TitipSewaFlag { get; set; }
        public Guid StatusId { get; set; }
        public DateTime? PeriodStart { get; set; }
        public DateTime? PeriodEnd { get; set; }
        public DateTime? CancelEnd { get; set; }
        public int PeriodTime { get; set; }
        public bool IsFoodCourt { get; set; }
        public Guid? OutletTypeId { get; set; }
        public Guid GroupId { get; set; }
        public int VirtualAccount { get; set; }
        public DateTime? HandOverdateReal { get; set; }
        public Guid? RefId { get; set; }
        public string LocationMap { get; set; }
        public decimal square { get; set; }
        public string OutletName { get; set; }
        public string UnitOwner { get; set; }
        public string TenantOwner { get; set; }
        public string OutletType { get; set; }
        public bool IsDisplayArea { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public decimal SubscriptionFee { get; set; }
        public decimal MaintenanceFee { get; set; }
        public decimal UsageFee1 { get; set; }
        public decimal UsageFee2 { get; set; }
        public decimal ChargeAmount { get; set; }
        public int PamNode { get; set; }
        public int GasNode { get; set; }
        public int PlnNode { get; set; }
        public int TotPower { get; set; }
    }
}
