using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.ViewModels
{
    public class ViewEmployeeModel
    {
		public int EmployeeID { get; set; }
		public string EmployeeNo { get; set; }
		public string EmployeeName { get; set; }
		public string EmployeeAddr { get; set; }
		public string EmployeeCity { get; set; }
		public DateTime? EmployeeDate { get; set; }
		public string WorkStatus { get; set; }
		public string Division { get; set; }
		public string SubDivision { get; set; }
		public string Position { get; set; }
		public string Education { get; set; }
	}
}
