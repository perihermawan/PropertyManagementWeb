using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class MFOutlet
    {
        public string OrderNumber { get; set; }
        public string OutletType { get; set; }
        public string Location { get; set; }
        public string Square { get; set; }
        public string OutletName { get; set; }
        public string HandOverDateReal { get; set; }
        public string UnitOwner { get; set; }
        public string OpenDateReal { get; set; }
        public string TenantOwner { get; set; }
        public string RentStartDate { get; set; }
        public string Status { get; set; }
        public string Details { get; set; }
    }
}
