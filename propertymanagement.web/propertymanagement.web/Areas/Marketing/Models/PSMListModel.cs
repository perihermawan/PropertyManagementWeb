using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class PSMListModel
    {
        public Guid? RentId { get; set; }
        public string KSMNumber { get; set; }
        public string PSMNumber { get; set; }
        public string LocationMap { get; set; }
        public decimal? Square { get; set; }
        public string OutletId { get; set; }
        public string OutletName { get; set; }
        public string OutletTypeId { get; set; }
        public string OutletType { get; set; }
        public bool IsFoodCourt { get; set; }
        public string LobId { get; set; }
        public string VirtualAccountRent { get; set; }
        public string VirtualAccountMFUtl { get; set; }
        public string UnitOwner { get; set; }
        public string TenantOwner { get; set; }
        public string Status { get; set; }
    }
}
