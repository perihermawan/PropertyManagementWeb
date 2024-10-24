using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class PullOutViewModel
    {
        public Guid? RentId { get; set; }
        public string KsmNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal Square { get; set; }
        public string OutletName { get; set; }
        public string TenantOwner { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string CreateUser { get; set; }
        public string UpdateUser { get; set; }
    }


    public class PullOutRentViewModel
    {
        public DateTime? PullOutDate { get; set; }
        public string PullOutBy { get; set; }
        public bool? IsPullOut { get; set; }
        public decimal OutstandingAmount { get; set; }
        public DateTime? EndDateKSM { get; set; }
        public DateTime? EndDate { get; set; }
        public DateTime? ClosingDate { get; set; }
        public string ClosingBy { get; set; }
        public bool? IsClosing { get; set; }

    }

    public class PullOutDetailViewModel
    {
        public int? Installments { get; set; }
        public string KsmNumber { get; set; }
        public int? PeriodMonth { get; set; }
        public string LocationMap { get; set; }
        public DateTime? ChargeDateFrom { get; set; }
        public decimal Square { get; set; }
        public int PeriodPullOut { get; set; }
        public string OutletName { get; set; }
        public string Name { get; set; }
        public decimal DownPaymentAmount { get; set; }
        public decimal DepositAmount { get; set; }
        public decimal PaymentRentInv { get; set; }
        public decimal RentAmount { get; set; }
        public decimal DiscAmount { get; set; }
        public decimal PenaltyRentInv { get; set; }
        public decimal OutstandingSCInv { get; set; }
        public decimal PaymentSCInv { get; set; }
        public decimal PenaltySCInv { get; set; }
        public decimal OutstandingOtherInv { get; set; }
        public decimal PaymentOtherInv { get; set; }
        public decimal PenaltyOtherInv { get; set; }
        public decimal OutstandingUtilInv { get; set; }
        public decimal PaymentUtilInv { get; set; }
        public decimal PenaltyUtilInv { get; set; }

    }
}
