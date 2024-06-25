using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Models.Master
{
    public class TenantOwnerModel
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
        public string IdCardNumber { get; set; }
        public string NPWPNumber { get; set; }
        public string NPWPName { get; set; }
        public string NPWPAddress { get; set; }
        public string NPWPCity { get; set; }
        public string NPWPZipCode { get; set; }
        public bool NPWPEarlyPaid { get; set; }
        public Guid TenantOwnerTypeId { get; set; }
        public Guid IdCardTypeId { get; set; }
        public string Type { get; set; }
        public bool IsDeleted { get; set; }
        public bool IsPosted { get; set; }
        public string Reason { get; set; }
        public string PostedUser { get; set; }
        public DateTime? PostedDate { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeletUser { get; set; }
        public bool CLNPWPEarlyPaid { get; set; }
    }
    public class InvoiceTo
    {
        public Guid InvId { get; set; }
        public string InvName { get; set; }
        public string InvAddress { get; set; }
        public string InvCity { get; set; }
        public string InvZipCode { get; set; }
        public string InvHomePhone { get; set; }
        public string InvOfficePhone { get; set; }
        public string InvHandPhone { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeleteUser { get; set; }
    }

    public class PersonInCharge
    {
        public Guid PicId { get; set; }
        public string PicName { get; set; }
        public string PicAddress { get; set; }
        public string PicCity { get; set; }
        public string PicZipCode { get; set; }
        public string PicHomePhone { get; set; }
        public string PicOfficePhone { get; set; }
        public string PicHandPhone { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeleteUser { get; set; }
    }

    public class Correspondence
    {
        public Guid CorrId { get; set; }
        public string CorrName { get; set; }
        public string CorrAddress { get; set; }
        public string CorrCity { get; set; }
        public string CorrZipCode { get; set; }
        public bool IsDeleted { get; set; }
        public DateTime? CreateDate { get; set; }
        public string CreateUser { get; set; }
        public DateTime? UpdateDate { get; set; }
        public string UpdateUser { get; set; }
        public DateTime? DeleteDate { get; set; }
        public string DeleteUser { get; set; }

    }
}
