using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace propertymanagement.web.Models.Master
{
    [Table("Role")]
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
}
