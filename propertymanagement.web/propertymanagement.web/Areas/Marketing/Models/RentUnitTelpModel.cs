using Newtonsoft.Json;
using propertymanagement.web.Areas.Master.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class RentUnitTelp
    {
        [JsonProperty(propertyName: "rentKsm")]
        public RentKsm Rent { get; set; }

        [JsonProperty(propertyName: "unit")]
        public List<RentUnitListModel> Unit { get; set; }

        [JsonProperty(propertyName: "telp")]
        public List<RentTelpModel> Telp { get; set; }

    }

    public class RentUnitTelpEdit
    {
        [JsonProperty(propertyName: "rentKsm")]
        public RentKsm Rent { get; set; }

        [JsonProperty(propertyName: "unit")]
        public List<RentUnitListModel> Unit { get; set; }

        [JsonProperty(propertyName: "telp")]
        public List<RentTelpListEditModel> Telp { get; set; }

    }
}
