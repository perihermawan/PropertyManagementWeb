using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace propertymanagement.web.Models.Master
{
    public class RoleModel
    {
        public int RoleId { get; set; }
        public string Rolename { get; set; }
        public string ApplicationName { get; set; }
    }
}
