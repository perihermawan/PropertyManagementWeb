using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models
{
    public class Outlet
    {
        public Guid OutletId { get; set; }
        public string OutletName { get; set; }
        public Guid LobId { get; set; }
        public string SubLOB { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeleteUser { get; set; }
    }
}
