using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using propertymanagement.web.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace propertymanagement.web.Models.Master
{
    public class User
    {
        public string Id { get; set; }
        public string EMPLOYEEBASICINFOID { get; set; }
        public string FULL_NAME { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string TOKEN { get; set; }
        public string ALIASNAME { get; set; }
        //public bool IsActive { get; set; }
    }
}
