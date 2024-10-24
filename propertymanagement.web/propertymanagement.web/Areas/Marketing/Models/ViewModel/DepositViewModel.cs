using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class DepositViewModel
    {
        public Guid? RentId { get; set; }
        public string KsmNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal Square { get; set; }
        public string OutletName { get; set; }
        public string TenantOwner { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int Editable { get; set; }

    }

    public class DepositRentViewModel
    {
        public Guid? RentId { get; set; }
        public string KsmNumber { get; set; }
        public string PsmNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal Square { get; set; }
        public string OutletName { get; set; }
        public string UnitOwner { get; set; }
        public string TenantOwner { get; set; }
        public int PamNode { get; set; }
        public int GasNode { get; set; }
        public int PlnNode { get; set; }
        public int TlpNode { get; set; }
        public decimal TotPower { get; set; }
    }

    public class DepositDetailViewModel
    {
        public Guid? RentId { get; set; }
        public Guid? DepositId { get; set; }
        public Guid? InvoiceId { get; set; }
        public Guid? DepositTypeId { get; set; }
        public string DepositType { get; set; }
        public string PsmNumber { get; set; }
        public string KsmNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal Square { get; set; }
        public string OutletName { get; set; }
        public string UnitOwner { get; set; }
        public string TenantOwner { get; set; }
        public DateTime? ReceiptDate { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? ReturnDate { get; set; }
        public decimal DepositAmount { get; set; }
        public decimal ReceiptAmount { get; set; }
        public decimal ReturnAmount { get; set; }
        public int PlnNode { get; set; }
        public int PamNode { get; set; }
        public int GasNode { get; set; }
        public int TlpNode { get; set; }
        public decimal TotPower { get; set; }

    }

}
