using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.ViewModels
{
    public class ViewDetailActivityCompleted
    {
        public int ID { get; set; }
        public int ACTIVITY_HEADER_ID { get; set; }
        public string CUSTOMER_NAME { get; set; }
        public string PICCUSTOMER { get; set; }
        public string DESCRIPTION { get; set; }
        public string CHARGE_CD { get; set; }
        public string EMAIL { get; set; }
        public string NIK { get; set; }
        public string FULL_NAME { get; set; }
        public string EMPLOYEE_EMAIL { get; set; }
        public DateTime DATE_FROM { get; set; }
        public DateTime? DATE_TO { get; set; }
        public string TIME_FROM { get; set; }
        public string TIME_TO { get; set; }
        public string SUBJECT { get; set; }
        public string STATUS { get; set; }
    }
}
