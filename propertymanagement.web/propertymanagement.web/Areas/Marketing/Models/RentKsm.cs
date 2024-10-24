using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentKsm
    {
        public Guid? RentId { get; set; }
        public string NextKSMNumber { get; set; }
        public string NextPSMNumber { get; set; }
        public string tipeUnit { get; set; }
        public string departement { get; set; }
        public string keterangan { get; set; }
        public string Type { get; set; }
        public string PSMNumberRef { get; set; }
        public string PSMNumber { get; set; }
        public string KSMNumber { get; set; }
        public string KSMDate { get; set; }
        public string PSMDate { get; set; }
        public string outletName { get; set; }
        public string outletId { get; set; }
        public string outletTypeId { get; set; }
        public string foodcourt { get; set; }
        public string majorStore { get; set; }
        public string lob { get; set; }
        public string subLobId { get; set; }
        public string subLob { get; set; }
        public string chargeTo { get; set; }
        public string dueDate { get; set; }
        public string marketingAgent { get; set; }
        public string marketingAgentName { get; set; }
        public string temporaryTenant { get; set; }
        public string owner { get; set; }
        public string tenant { get; set; }
        public string periodMonth { get; set; }
        public string periodYear { get; set; }
        public string handoverDate { get; set; }
        public string handoverDateRl { get; set; }
        public string fittingoutPeriod { get; set; }
        public string outletOpenDt { get; set; }
        public string outletOpenDtRl { get; set; }
        public string rentStartDt { get; set; }
        public string rentEndDtKsm { get; set; }
        public string extraTerm { get; set; }
        public string extraTermDay { get; set; }
        public string rentEndDt { get; set; }
        public string gracePeriod { get; set; }
        public string gracePeriodDay { get; set; }
        public string chargeStartDt { get; set; }
        public string npwp { get; set; }
        public string groupId { get; set; }
        public string group { get; set; }
        public string virtualAccountRent { get; set; }
        public string virtualAccountMFUtl { get; set; }
        public string ksmStatus { get; set; }
        public string flagGenPSMNo { get; set; }
        public string flagReGenPaymentSchedule { get; set; }
        public string txtStartDateMF { get; set; }
        public string txtEndDateMF { get; set; }
        public string rentTotalSquare { get; set; }
        public string unitTotalSquare { get; set; }
        public string remark { get; set; }

    }
}
