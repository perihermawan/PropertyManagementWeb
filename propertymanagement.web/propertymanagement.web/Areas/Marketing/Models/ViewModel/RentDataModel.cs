using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models.ViewModel
{
    public class RentDataModel
    {
        public Guid? rentId { get; set; }
        public string type { get; set; }
        public string psmNumber { get; set; }
        public string ksmNumber { get; set; }
        public string ksmDate { get; set; }
        public string psmDate { get; set; }
        public string outletId { get; set; }
        public string outletName { get; set; }
        public string outletType { get; set; }
        public string isFoodCourt { get; set; }
        public string lob { get; set; }
        public string subLob { get; set; }
        public string chargeTo { get; set; }
        public string dueDate { get; set; }
        public string marketingAgen { get; set; }
        public string isTempTenant { get; set; }
        public string owner { get; set; }
        public string tenant { get; set; }
        public string rentPeriodMonth { get; set; }
        public string rentPeriodYear { get; set; }
        public string handoverDate { get; set; }
        public string fittingOutPeriod { get; set; }
        public string outletOpenDate { get; set; }
        public string outletOpenDateRl { get; set; }
        public string rentStartDate { get; set; }
        public string rentEndDateKsm { get; set; }
        public string extTerm { get; set; }
        public string rentEndDate { get; set; }
        public string gracePeriod { get; set; }
        public string chargeStartDate { get; set; }
        public string npwp { get; set; }
        public string group { get; set; }
        public string rgPaySchedule { get; set; }
        public string mtFeeFrom { get; set; }
        public string mtFeeTo { get; set; }
    }
}
