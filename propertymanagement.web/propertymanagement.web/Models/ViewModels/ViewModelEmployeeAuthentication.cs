using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using propertymanagement.web.Models.Session;

namespace propertymanagement.web.Models.ViewModels
{
    public class ViewModelEmployeeAuthentication
    {
        public int ID { get; set; }
        public string DIVISIONID { get; set; }
        public string FULL_NAME { get; set; }
        public string PHONE { get; set; }
        public string EMAIL { get; set; }
        public string USERPPWD { get; set; }
        public string TOKEN { get; set; }
        public string EMPLOYEEBASICINFOID { get; set; }
        public string ALIASNAME { get; set; }
        public string COMPID{ get; set; }
        public List<MenuSession> MENULIST { get; set; }
        public List<PermissionSession> PERMISSIONLIST { get; set; }
    }
}
