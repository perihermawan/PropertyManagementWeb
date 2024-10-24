using System;

namespace propertymanagement.web.Areas.Finance.Models.ViewModel
{
    public class InvoiceViewModel
    {
        public DateTime Date { get; set; }
        public string Mode { get; set; }
        public string Period { get; set; }
        public string Option { get; set; }
    }

    public class LastGenerateDateOutputModel
    {
        public DateTime LastGenerateDate { get; set; }
    }
}
