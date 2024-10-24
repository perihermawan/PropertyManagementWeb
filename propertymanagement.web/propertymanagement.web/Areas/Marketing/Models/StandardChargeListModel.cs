using System;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class StandardChargeListModel
    {
        public Guid? rentId { get; set; }
        public string ksmNumber { get; set; }
        public string location { get; set; }
        public decimal? rentSquare { get; set; }
        public string outletName { get; set; }
        public string tenantName { get; set; }
        public string chargeFrom { get; set; }
        public string chargeTo { get; set; }
        public string createDate { get; set; }
    }
}
