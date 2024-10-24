using Newtonsoft.Json;

using System;
using System.ComponentModel;

namespace propertymanagement.web.Areas.Marketing.Models
{
    public class unit
    {
        [JsonProperty(PropertyName = "unitId")]
        public Guid UnitId { get; set; }

        [JsonProperty(PropertyName = "mapId")]
        public Guid MapId { get; set; }

        [JsonProperty(PropertyName = "origSquare")]
        public decimal? OrigSquare { get; set; }

        [JsonProperty(PropertyName = "extSquare")]
        public decimal? ExtSquare { get; set; }

        [JsonProperty(PropertyName = "facSquare")]
        public decimal? FacSquare { get; set; }

        [JsonProperty(PropertyName = "rentSquare")]
        public decimal? RentSquare { get; set; }

        [JsonProperty(PropertyName = "plnFlag")]
        public bool? PlnFlag { get; set; }

        [JsonProperty(PropertyName = "kwhMeter")]
        public string KwhMeter { get; set; }

        [JsonProperty(PropertyName = "power")]
        public decimal? Power { get; set; }

        [JsonProperty(PropertyName = "ctFactor")]
        [DefaultValue(0)]
        public int CTFactor { get; set; }

        [JsonProperty(PropertyName = "phasa")]
        [DefaultValue(0)]
        public int Phasa { get; set; }

        [JsonProperty(PropertyName = "pamFlag")]
        public bool? PamFlag { get; set; }

        [JsonProperty(PropertyName = "pamMeter")]
        public string PamMeter { get; set; }

        [JsonProperty(PropertyName = "pipeID")]
        public Guid? PipeID { get; set; }

        [JsonProperty(PropertyName = "gasFlag")]
        public bool? GasFlag { get; set; }

        [JsonProperty(PropertyName = "gasMeter")]
        public string GasMeter { get; set; }

        [JsonProperty(PropertyName = "telpFlag")]
        public bool? TelpFlag { get; set; }

        [JsonProperty(PropertyName = "telpNumber")]
        public string TelpNumber { get; set; }

        [JsonProperty(PropertyName = "statusID")]
        public Guid? StatusID { get; set; }

        [JsonProperty(PropertyName = "basicPrice")]
        public decimal? BasicPrice { get; set; }

        [JsonProperty(PropertyName = "pressureID")]
        public Guid? PressureID { get; set; }

        [JsonProperty(PropertyName = "remarks")]
        public string Remarks { get; set; }

        [JsonProperty(PropertyName = "subId")]
        public int? SubId { get; set; }

        [JsonProperty(PropertyName = "isDeleted")]
        [DefaultValue(false)]
        public bool IsDeleted { get; set; }

        [JsonProperty(PropertyName = "isPosted")]
        [DefaultValue(false)]
        public bool IsPosted { get; set; }

        [JsonProperty(PropertyName = "reason")]
        public string Reason { get; set; }

        [JsonProperty(PropertyName = "postedUser")]
        public string PostedUser { get; set; }

        [JsonProperty(PropertyName = "postedDate")]
        public DateTime? PostedDate { get; set; }

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
        
        [JsonProperty(PropertyName = "unitNameId")]
        public Guid? UnitNameId { get; set; }

        [JsonProperty(PropertyName = "othersSquare")]
        [DefaultValue(0)]
        public decimal OthersSquare { get; set; }

        [JsonProperty(PropertyName = "certifySquare")]
        [DefaultValue(0)]
        public decimal CertifySquare { get; set; }

        [JsonProperty(PropertyName = "zonaId")]
        public Guid? ZonaId { get; set; }
    }
}
