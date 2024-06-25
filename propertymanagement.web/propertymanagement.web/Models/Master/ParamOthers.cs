using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Master
{
    public class ParamOthers
    {
        public string ParamID { get; set; }
        public string ParamValue { get; set; }
        public string ParamCode { get; set; }
        public int? ParamSort { get; set; }
        public string Code { get; set; }
        public bool IsDeleted { get; set; }
    }
}
