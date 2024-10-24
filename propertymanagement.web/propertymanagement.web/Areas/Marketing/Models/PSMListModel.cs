using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class PSMListModel
    {
        public Guid? RentId { get; set; }
        public DateTime? KSMDate { get; set; }
        public DateTime? PSMDate { get; set; }
        public string? KSMNumber { get; set; }
        public string? PSMNumber { get; set; }
        public decimal? Square { get; set; }
        public Guid? MediaTypeId { get; set; }
        public string? FlagPromotion { get; set; }
        public Guid? OutletId { get; set; }
        public Guid? OwnerId { get; set; }
        public Guid? TenantId { get; set; }
        public bool? IsTempTenant { get; set; }
        public decimal? PeriodYear { get; set; }
        public int? PeriodMonth { get; set; }
        public int? PeriodDay { get; set; }
        public DateTime? HandOverDateReal { get; set; }
        public DateTime? HandOverDate { get; set; }
        public int? FittingOutPeriod { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? OpenDateReal { get; set; }
        public DateTime? EndDateKSM { get; set; }
        public int? ExtraTerm { get; set; }
        public int? ExtraTermDay { get; set; }
        public DateTime? EndDate { get; set; }
        public int? GracePeriod { get; set; }
        public int? GracePeriodDay { get; set; }
        public int? DueDate { get; set; }
        public DateTime? ChargeDateFrom { get; set; }
        public Guid? ChargeToId { get; set; }
        public string? MarketingName { get; set; }
        public DateTime? PullOutDate { get; set; }
        public string? PullOutBy { get; set; }
        public bool? IsPullOut { get; set; }
        public DateTime? ClosingDate { get; set; }
        public string? ClosingBy { get; set; }
        public bool? IsClosing { get; set; }
        public decimal? RentAmount { get; set; }
        public decimal? DiscAmount { get; set; }
        public decimal? TaxPercentage { get; set; }
        public decimal? RentTax { get; set; }
        public decimal? DPAmount { get; set; }
        public decimal? DPTax { get; set; }
        public decimal? OutstandingAmount { get; set; }
        public decimal? OutstandingTax { get; set; }
        public int? Installments { get; set; }
        public DateTime? ChargeDateTo { get; set; }
        public Guid? ChargeTypeId { get; set; }
        public decimal? ChargeAmount { get; set; }
        public bool? IsFoodCourt { get; set; }
        public Guid? OutletTypeId { get; set; }
        public string? Remarks { get; set; }
        public string? RemarksRentCharge { get; set; }
        public Guid? RefId { get; set; }
        public string? NPWP { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
        public string? CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string? UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string? DeleteUser { get; set; }
        public DateTime? CreateDateClosing { get; set; }
        public Guid? GroupingId { get; set; }
        public int? KSMType { get; set; }
        public decimal? CompansasiAmount { get; set; }
        public decimal? CompansasiVAT { get; set; }
        public decimal? CompansasiAmountVAT { get; set; }
        public int? KsmStatus { get; set; }
        public bool? IsMajorStore { get; set; }
        public string? KSMCounterNo { get; set; }
        public string? KSMCounterYear { get; set; }
        public Guid? TipeUnitId { get; set; }
        public Guid? DeptId { get; set; }
        public Guid? DescriptionId { get; set; }
        public string? PSMCounterNo { get; set; }
        public string? PSMCounterYear { get; set; }
        public bool? FlagGenPSMNo { get; set; }
        public string? VirtualAccountRent { get; set; }
        public string? VirtualAccountMFUtl { get; set; }
        public string? LocationMap { get; set; }
        public string? OutletName { get; set; }
        public string? UnitOwner { get; set; }
        public string? TenantOwner { get; set; }
        public string? ChargeType { get; set; }
        public string? OutletType { get; set; }
        public string? LobName { get; set; }
        public string? SubLob { get; set; }
        public Guid? LobId { get; set; }
        public string? Status { get; set; }
    }
}
