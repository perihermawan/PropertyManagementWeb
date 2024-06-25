using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models.ViewModel
{
    public class UserListModel
    {
        public int UserId { get; set; }
        public string Password { get; set; }
        public string UserName { get; set; }
        public string EmployeeNo { get; set; }
        public int CompId { get; set; }
        public bool? IsActive { get; set; }
        public string Module { get; set; }
        public bool? IsDeleted { get; set; }
        public DateTime? LoggedOut { get; set; }
        public DateTime? LoggedIn { get; set; }
        public int NumLogIns { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeleteUser { get; set; }
        public DateTime? LastActiveDate { get; set; }
        public string FormActive { get; set; }
        //public string CompanyName { get; set; }
        public string EmployeeName { get; set; }
        public string Email { get; set; }
        public string Sex { get; set; }
    }
}
