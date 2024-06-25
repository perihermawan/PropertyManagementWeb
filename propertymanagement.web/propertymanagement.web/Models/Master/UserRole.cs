using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace propertymanagement.web.Models.Master
{
    [Table("UserRole")]
    public class UserRole
    {
        public long Id { get; set; }
        public long UserId { get; set; }
        public int RoleId { get; set; }
    }
}
