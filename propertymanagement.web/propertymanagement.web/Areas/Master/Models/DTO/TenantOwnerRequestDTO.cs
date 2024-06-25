using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Master.Models.DTO
{
    public class TenantOwnerRequestDTO
    {

        [JsonProperty(propertyName: "tenantOwner")]
        public object tenantOwner { get; set; }

        [JsonProperty(propertyName: "pic")]
        public object pic { get; set; }

        [JsonProperty(propertyName: "invoiceTo")]
        public object invoiceTo { get; set; }

        [JsonProperty(propertyName: "correspondence")]
        public object correspondence { get; set; }
    }
}
