using System;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class RentAmountViewModel
    {
        public Guid rentAmountId { get; set; }
        public Guid rentId { get; set; }
        public int periodFrom { get; set; }
        public int periodTo { get; set; }
        public int periodMonth { get; set; }
        public decimal perMonthPerM2Amount { get; set; }
        public decimal periodAmount { get; set; }
        public bool isDeleted { get; set; }
        public DateTime createDate { get; set; }
        public string createUser { get; set; }
        public DateTime updateDate { get; set; }
        public string updateUser { get; set; }
        public DateTime deleteDate { get; set; }
        public string deleteUser { get; set; }
    }
}
