using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentTelpModel
    {
        public Guid? unitId { get; set; }
        public string MapNumber { get; set; }
        public string TelpNumber { get; set; }
        public string TelpStatus { get; set; }
    }
}
