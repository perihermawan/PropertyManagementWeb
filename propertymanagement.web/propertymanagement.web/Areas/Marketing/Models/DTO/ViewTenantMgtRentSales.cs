using propertymanagement.web.Areas.Marketing.Models.ViewModel;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models.DTO
{
    public class ViewTenantMgtRentSales
    {
        public List<ViewTenantMgtRentModel> tenantRent { get; set; }
        public List<ViewTenantMgtSalesModel> tenantSales { get; set; }
    }
}
