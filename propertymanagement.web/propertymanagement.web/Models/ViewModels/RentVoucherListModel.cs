using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.ViewModels
{
    public class RentVoucherListModel
    {
        public Guid ID { get; set; }
        public string Mode { get; set; }
        public string Number { get; set; }
        public string OutletName { get; set; }
        public string TenantOwner { get; set; }
        public string Status { get; set; }
        public DateTime? EndDate { get; set; }
        public string LocationMap { get; set; }
        public int TotalPayment { get; set; }

    }
}
