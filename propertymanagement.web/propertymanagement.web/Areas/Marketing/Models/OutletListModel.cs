using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class OutletListModel
    {
        public Guid? outletId { get; set; }
        public string outletName { get; set; }
        public string outletTypeName { get; set; }
        public Guid? lobId { get; set; }
        public string lobname { get; set; }
        public string subLob { get; set; }
    }
}
