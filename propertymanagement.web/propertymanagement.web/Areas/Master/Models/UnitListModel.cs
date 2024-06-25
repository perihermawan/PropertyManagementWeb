using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models
{
    public class UnitListModel
    {
        public Guid? UnitID { get; set; }
        public string Floor { get; set; }
        public string Block { get; set; }
        public string Number { get; set; }
        public decimal? OrigSquare { get; set; }
        public decimal? ExtSquare { get; set; }
        public decimal? FacSquare { get; set; }
        public decimal? OthersSquare { get; set; }
        public decimal? RentSquare { get; set; }
        public string StatusDesc { get; set; }
    }
}
