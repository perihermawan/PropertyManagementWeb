using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Master
{
    public class UserAccessModel
    {
        public string ID { get; set; }
        public string USERID { get; set; }
        public string MENUID { get; set; }
        public string GROUPID { get; set; }
        public string SUBGOUPID { get; set; }
        public string DIVISIONID { get; set; }
        public bool ISREAD { get; set; }
        public bool ISADD { get; set; }
        public bool ISEDIT { get; set; }
        public bool ISDELETE { get; set; }
        public bool ISDELETED { get; set; }
        public bool ISACTIVE { get; set; }
        public bool CREATED_BY { get; set; }
        public bool CREATED_DT { get; set; }
        public bool MODIFIED_BY { get; set; }
        public bool MODIFIED_DT { get; set; }
    }
}
