using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class RentAmountViewModel
    {
        public Guid RentAmountId { get; set; }
        public Guid RentId { get; set; }
        public int PeriodFrom { get; set; }
        public int PeriodTo { get; set; }
        public int PeriodMonth { get; set; }
        public decimal PerMonthPerM2Amount { get; set; }
        public decimal PeriodAmount { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime DeleteDate { get; set; }
        public string DeleteUser { get; set; }
    }
}
