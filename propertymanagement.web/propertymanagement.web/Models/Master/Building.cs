using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Master
{
    public class Building
    {
		[Key]
		public Guid BuildingId { get; set; }
		public string BuildingName { get; set; }
		public string BuildingCode { get; set; }
		public bool? IsDeleted { get; set; }
		public string CreateUser { get; set; }
		public DateTime? CreateDate { get; set; }
		public string UpdateUser { get; set; }
		public DateTime? UpdateDate { get; set; }
		public string DeleteUser { get; set; }
		public DateTime? DeleteDate { get; set; }
	}
}
