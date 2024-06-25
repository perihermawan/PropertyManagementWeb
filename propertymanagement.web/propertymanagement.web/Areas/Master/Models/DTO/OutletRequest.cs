using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models.DTO
{
    public class OutletRequest
    {
        public string OutletName { get; set; }
        public Guid LobId { get; set; }
        public string SubLOB { get; set; }
    }
}
