using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Session
{
    public class PermissionSession
    {
        public Guid ID { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public Guid? ParentID { get; set; }
        
    }
}
