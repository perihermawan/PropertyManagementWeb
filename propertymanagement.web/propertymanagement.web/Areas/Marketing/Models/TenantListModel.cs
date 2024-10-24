using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class TenantListModel
    {
        public Guid? tenantId { get; set; }
        public string tenantName { get; set; }
    }
}
