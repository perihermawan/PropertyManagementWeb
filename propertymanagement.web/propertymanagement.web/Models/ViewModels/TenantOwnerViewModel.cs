using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.ViewModels
{
    public class TenantOwnerViewModel
    {
        public Guid TenantOwnerId { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public string HomePhone { get; set; }
        public string OfficePhone { get; set; }
        public string Handphone { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string TenantOwnerTypeDesc { get; set; }
        public string Type { get; set; }
        public string IdCardTypeDesc { get; set; }
        public string IdCardNumber { get; set; }
        public string NPWPNumber { get; set; }
        public string NPWPName { get; set; }
        public string NPWPAddress { get; set; }
        public string NPWPCity { get; set; }
        public string NPWPZipCode { get; set; }
        public bool NPWPEarlyPaid { get; set; }
        public Guid IdCardTypeId { get; set; }
        public Guid TenantOwnerTypeId { get; set; }
        public bool IsPosted { get; set; }
        public string Reason { get; set; }
        public bool CLNPWPEarlyPaid { get; set; }
    }
}
