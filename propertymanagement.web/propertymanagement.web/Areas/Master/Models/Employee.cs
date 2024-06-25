using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models
{
    public class Employee
    {
		public int EmployeeID { get; set; }
		public string EmployeeNo { get; set; }
		public string EmployeeName { get; set; }
		public string EmployeeAddr { get; set; }
		public string EmployeeCity { get; set; }
		public string EmployeeDate { get; set; }
		public string BirthPlace { get; set; }
		public string BirthDate { get; set; }
		public string Sex { get; set; }
		public int ReligionID { get; set; }
		public string MaritalStatus { get; set; }
		public string IDNo { get; set; }
		public string Phone { get; set; }
		public string MobilePhone { get; set; }
		public string Email { get; set; }
		public int WorkStatusID { get; set; }
		public int DivisionID { get; set; }
		public int SubDivisionID { get; set; }
		public int PositionID { get; set; }
		public int EducationID { get; set; }
		public double? Salary { get; set; }
		public string PicturePath { get; set; }
		public string ResignDate { get; set; }
		public bool? IsDeleted { get; set; }
		public DateTime? CreateDate { get; set; }
		public string CreateUser { get; set; }
		public DateTime? UpdateDate { get; set; }
		public string UpdateUser { get; set; }
		public DateTime? DeleteDate { get; set; }
		public string DeleteUser { get; set; }
	}
}
