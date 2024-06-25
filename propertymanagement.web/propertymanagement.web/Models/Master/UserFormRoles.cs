using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Master
{
    public class UserFormRoles
    {
        public int UserId { get; set; }
        public string Form { get; set; }
        public bool IsRead { get; set; }

        public bool IsAdd { get; set; }
        public bool IsEdit { get; set; }
        public bool IsDelete { get; set; }

        public bool IsPost { get; set; }

        public string Param { get; set; }
    }
}
