using Newtonsoft.Json;

using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class map
    {
        [JsonProperty(PropertyName = "mapId")]
        public Guid MapId { get; set; }

        [JsonProperty(PropertyName = "mapNumber")]
        public string MapNumber { get; set; }

        [JsonProperty(PropertyName = "buildingID")]
        public Guid BuildingID { get; set; }

        [JsonProperty(PropertyName = "floor")]
        public string Floor { get; set; }

        [JsonProperty(PropertyName = "block")]
        public string Block { get; set; }

        [JsonProperty(PropertyName = "number")]
        public string Number { get; set; }

        [JsonProperty(PropertyName = "unitId")]
        public Guid UnitId { get; set; }

        [JsonProperty(PropertyName = "isDeleted")]
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

        [JsonProperty(PropertyName = "createUser")]
        public string CreateUser { get; set; }

        [JsonProperty(PropertyName = "createDate")]
        public DateTime? CreateDate { get; set; }

        [JsonProperty(PropertyName = "updateUser")]
        public string UpdateUser { get; set; }

        [JsonProperty(PropertyName = "updateDate")]
        public DateTime? UpdateDate { get; set; }

        [JsonProperty(PropertyName = "deleteUser")]
        public string DeleteUser { get; set; }

        [JsonProperty(PropertyName = "deleteDate")]
        public DateTime? DeleteDate { get; set; }

        [JsonProperty(PropertyName = "mapNumberOld")]
        public string MapNumberOld { get; set; }
    }
}
