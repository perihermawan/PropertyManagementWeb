using System.Collections.Generic;
using System;
using System.Text.Json.Serialization;
using Newtonsoft.Json;

namespace propertymanagement.web.Areas.Marketing.Models.DTO
{
    public class StandardChargeRequest
    {
        [JsonProperty("items")]
        public List<StandardChargeItemModel> items { get; set; }
        
    }
}
