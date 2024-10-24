using Newtonsoft.Json;

namespace propertymanagement.web.Areas.Marketing.Models.DTO
{
    public class DataUnitPuschartModel
    {
        [JsonProperty(propertyName: "unit")]
        public unit Unit { get; set; }

        [JsonProperty(propertyName: "map")]
        public map Map { get; set; }
    }
}
