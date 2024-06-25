using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Agit.Domain;

namespace propertymanagement.web.domain
{
    public partial class Menu : IBaseRecord<Guid>
    {
            
            public Guid ID { get; set; }
            public Guid? ParentID { get; set; }
            public Guid PermissionID { get; set; }
            public Guid MenuGroupID { get; set; }
            public string Title { get; set; }
            public string Url { get; set; }
            public string Description { get; set; }
            public string IconClass { get; set; }
            public Int16 OrderIndex { get; set; }
            public Int16 Visible { get; set; }
            public DateTime CreatedOn { get; set; }
            public string CreatedBy { get; set; }
    }
}
