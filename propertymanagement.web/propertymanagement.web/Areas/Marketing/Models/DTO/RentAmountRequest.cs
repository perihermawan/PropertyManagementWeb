using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace propertymanagement.web.Areas.Marketing.Models.DTO
{
    public class RentAmountRequest
    {
        [JsonPropertyName("rentId")]
        public Guid? rentId { get; set; }
        
        [JsonPropertyName("instId")]
        public Guid? instId { get; set; }

        [JsonPropertyName("psmNumber")]
        public string psmNumber { get; set; }

        [JsonPropertyName("locationMap")]
        public string locationMap { get; set; }

        [JsonPropertyName("square")]
        public string square { get; set; }

        [JsonPropertyName("periodMonth")]
        public string periodMonth { get; set; }

        [JsonPropertyName("outletName")]
        public string outletName { get; set; }

        [JsonPropertyName("unitOwner")]
        public string unitOwner { get; set; }

        [JsonPropertyName("tenantOwner")]
        public string tenantOwner { get; set; }

        [JsonPropertyName("handOverDate")]
        public string handOverDate { get; set; }

        [JsonPropertyName("undefined")]
        public string undefined { get; set; }

        [JsonPropertyName("subTotal")]
        public string subTotal { get; set; }

        [JsonPropertyName("discount")]
        public string discount { get; set; }

        [JsonPropertyName("totalExcl")]
        public string totalExcl { get; set; }

        [JsonPropertyName("vat")]
        public string vat { get; set; }

        [JsonPropertyName("totalIncl")]
        public string totalIncl { get; set; }

        [JsonPropertyName("rentAmountExcl")]
        public string rentAmountExcl { get; set; }

        [JsonPropertyName("rentVat")]
        public string rentVat { get; set; }

        [JsonPropertyName("rentAmountIncl")]
        public string rentAmountIncl { get; set; }

        [JsonPropertyName("dpAmountExcl")]
        public string dpAmountExcl { get; set; }

        [JsonPropertyName("dpVat")]
        public string dpVat { get; set; }

        [JsonPropertyName("dpAmountIncl")]
        public string dpAmountIncl { get; set; }

        [JsonProperty("compansasiAmountExcl")]
        public string compansasiAmountExcl { get; set; }

        [JsonProperty("compansasiVat")]
        public string compansasiVat { get; set; }

        [JsonProperty("compansasiAmountIncl")]
        public string compansasiAmountIncl { get; set; }

        [JsonPropertyName("outstandingAmountExcl")]
        public string outstandingAmountExcl { get; set; }

        [JsonPropertyName("outstandingVat")]
        public string outstandingVat { get; set; }

        [JsonPropertyName("outstandingAmountIncl")]
        public string outstandingAmountIncl { get; set; }

        [JsonPropertyName("rentEndDate")]
        public string rentEndDate { get; set; }

        [JsonPropertyName("chargeStartDate")]
        public string chargeStartDate { get; set; }

        [JsonPropertyName("installments")]
        public string installments { get; set; }

        [JsonPropertyName("chargeTypeId")]
        public string chargeTypeId { get; set; }

        [JsonPropertyName("chargeTypeName")]
        public string chargeTypeName { get; set; }

        [JsonProperty("instStart")]
        public string instStart { get; set; }

        [JsonPropertyName("rentAmountItems")]
        public List<RentAmountItem> rentAmountItems { get; set; }

        [JsonPropertyName("dpItems")]
        public List<DpItem> dpItems { get; set; }
    }
}
