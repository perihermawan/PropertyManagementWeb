using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models.DTO
{
    public class MapUnitModel
    {
        [JsonProperty(propertyName:"unit")]
        public unit Unit { get; set; }

        [JsonProperty(propertyName: "map")]
        public map Map { get; set; }
    }
}
