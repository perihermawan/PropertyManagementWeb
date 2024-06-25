using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Session
{
    public class MenuSession
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

    }
}
