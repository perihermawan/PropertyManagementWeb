using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models.ViewModel
{
    public class ViewUserModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string EMPLOYEEBASICINFOID { get; set; }
        public string FullName { get; set; }
        public string Sex { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? CompId { get; set; }
        //public string TOKEN { get; set; }
        public bool IsActive { get; set; }
        //public string ALIASNAME { get; set; }
    }
}
