using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class PaymentScheduleViewModel
    {
        public Guid? RentId { get; set; }
        public string KsmNumber { get; set; }
        public int KsmType { get; set; }
        public string PsmNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal Square { get; set; }
        public string OutletName { get; set; }
        public string TenantOwner { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string ChargeType { get; set; }
        public string Status { get; set; }

    }

    public class PaymentScheduleMfViewModel
    {
        public Guid? Id { get; set; }
        public string No { get; set; }
        public string Mode { get; set; }
        public string LocationMap { get; set; }
        public string OutletName { get; set; }
        public string TenantName { get; set; }
        public string Status { get; set; }

    }

    public class PaymentScheduleCustomerInfoViewModel
    {
        public Guid? ChargeId { get; set; }
        public Guid? RentId { get; set; }
        public Guid? ChargeTypeId { get; set; }
        public DateTime? ChargeDate { get; set; }
        public int Installment { get; set; }
        public decimal Square { get; set; }
        public decimal OutStandingAmount { get; set; }
        public decimal BasicAmount { get; set; }
        public decimal MagPortion { get; set; }
        public decimal OmsetAmount { get; set; }
        public decimal AdditionalAmount { get; set; }
        public decimal ChargeAmount { get; set; }
        public decimal MinimumAmount { get; set; }
        public decimal RentAmount { get; set; }
        public string Remarks { get; set; }
        public bool IsPaid { get; set; }
        public bool IsDeleted { get; set; }
        public string ChargeType { get; set; }
        public string KsmNumber { get; set; }
        public string LocationMap { get; set; }
        public string PsmNumber { get; set; }
        public decimal PeriodYear { get; set; }
        public string TenantOwner { get; set; }
        public string OutletName { get; set; }
        public string UnitOwner { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsFoodCourt { get; set; }
        public int Editable { get; set; }
        public DateTime? ChargeDateFrom { get; set; }
        public DateTime? ChargeDateTo { get; set; }
        public string Description { get; set; }
        public DateTime? OmsetFrom { get; set; }
        public DateTime? OmsetTo { get; set; }

    }

    public class PaymentScheduleCustomerInfoMfViewModel
    {
        public Guid? MfChargeId { get; set; }
        public Guid? TenantMgtId { get; set; }
        public int Charge { get; set; }
        public DateTime? ChargeDate { get; set; }
        public DateTime? ServiceDateFrom { get; set; }
        public DateTime? ServiceDateTo { get; set; }
        public decimal ChargeAmount { get; set; }
        public int Months { get; set; }
        public int Days { get; set; }
        public bool TitipSewa { get; set; }
        public bool IsPaid { get; set; }
        public string Remarks { get; set; }
        public string KsmNumber { get; set; }
        public string PsmNumber { get; set; }
        public string OutletName { get; set; }
        public string UnitOwner { get; set; }
        public string TenantOwner { get; set; }
        public decimal PeriodYear { get; set; }
        public int PeriodMonth { get; set; }
        public DateTime? HandOverDate { get; set; }
        public int FittingOutPeriod { get; set; }
        public DateTime? OpenDate { get; set; }
        public DateTime? OpenDateReal { get; set; }
        public DateTime? EndDateKsm { get; set; }
        public int ExtraTerm { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int GracePeriod { get; set; }
        public int DueDate { get; set; }
        public DateTime? ChargeDateFrom { get; set; }
        public DateTime? ChargeDateTo { get; set; }
        public Guid? ChargeToId { get; set; }
        public string MarketingName { get; set; }
        public decimal RentAmount { get; set; }
        public decimal TaxPersentage { get; set; }
        public decimal RentTax { get; set; }
        public decimal DpAmount { get; set; }
        public decimal DpTax { get; set; }
        public decimal OutstandingAmount { get; set; }
        public decimal OutstandingTax { get; set; }
        public int Installments { get; set; }
        public string ChargeType { get; set; }
        public decimal ChargeAmountRent { get; set; }
        public string LocationMap { get; set; }
        public decimal Square { get; set; }
        public int Paid { get; set; }
        public string TenantMgtCode { get; set; }
        public bool IsPullOut { get; set; }
        public bool IsClosing { get; set; }
        public int Editable { get; set; }

    }
}
