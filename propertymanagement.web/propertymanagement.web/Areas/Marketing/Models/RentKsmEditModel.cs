using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentKsmEditModel
    {
        public Guid rentId { get; set; }
        public Guid tipeUnitId { get; set; }
        public Guid deptId { get; set; }
        public Guid descriptionId { get; set; }
        public int ksmType { get; set; }
        public Guid refId { get; set; }
        public string PSMNumber { get; set; }
        public string KSMNumber { get; set; }
        public DateTime KSMDate { get; set; }
        public DateTime PSMDate { get; set; }
        public string outletName { get; set; }
        public Guid outletId { get; set; }
        public Guid outletTypeId { get; set; }
        public bool isFoodcourt { get; set; }
        public bool isMajorStore { get; set; }
        public Guid lobId { get; set; }
        public string lobName { get; set; }
        public string subLob { get; set; }
        public Guid chargeToId { get; set; }
        public int dueDate { get; set; }
        public string marketingName { get; set; }
        public bool isTempTenant { get; set; }
        public Guid ownerId { get; set; }
        public Guid tenantId { get; set; }
        public int periodMonth { get; set; }
        public decimal periodYear { get; set; }
        public DateTime handoverDate { get; set; }
        public DateTime handoverDateReal { get; set; }
        public int fittingoutPeriod { get; set; }
        public DateTime openDate { get; set; }
        public DateTime openDateReal { get; set; }
        public DateTime startDate { get; set; }
        public DateTime endDateKsm { get; set; }
        public int extraTerm { get; set; }
        public int extraTermDay { get; set; }
        public DateTime endDate { get; set; }
        public int gracePeriod { get; set; }
        public int gracePeriodDay { get; set; }
        public DateTime chargeDateFrom { get; set; }
        public string npwp { get; set; }
        public Guid groupingId { get; set; }
        public string groupName { get; set; }
        public string virtualAccountRent { get; set; }
        public string virtualAccountMFUtl { get; set; }
        public int ksmStatus { get; set; }
        public decimal square { get; set; }
        public string remarks { get; set; }

    }
}
