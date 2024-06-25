using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models.ViewModel
{
    public class ViewOutletModel
    {
        public Guid? OutletId { get; set; }
        public string OutletName { get; set; }
        public Guid? LobId { get; set; }
        public string LobName { get; set; }
        public string SubLOB { get; set; }
        public int ParamSort { get; set; }
    }
}
