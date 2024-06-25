using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using propertymanagement.web.Models.Master;

namespace propertymanagement.web.ViewModels
{
    public class UserInfo
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public List<UserRole> userRole { get; set; }
        public List<Role> roleList { get; set; }
    }
}
