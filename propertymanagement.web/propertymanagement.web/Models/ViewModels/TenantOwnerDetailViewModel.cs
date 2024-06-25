using propertymanagement.web.Models.Master;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.ViewModels
{
    public class TenantOwnerDetailViewModel
    {
        public TenantOwnerViewModel TenantOwner { get; set; }
        public InvoiceTo InvoiceTo { get; set; }
        public PersonInCharge PersonInCharge { get; set; }
        public Correspondence Correspondence { get; set; }
       public bool IsEdit { get; set; }
    }
}
