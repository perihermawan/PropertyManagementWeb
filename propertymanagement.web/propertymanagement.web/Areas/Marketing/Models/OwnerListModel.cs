using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class OwnerListModel
    {
        public Guid? ownerId { get; set; }
        public string ownerName { get; set; }
    }
}
