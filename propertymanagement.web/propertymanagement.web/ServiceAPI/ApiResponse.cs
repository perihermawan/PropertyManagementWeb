using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Text;

namespace propertymanagement.web.ServiceAPI
{ 
    public class ApiResponse
    {
        [JsonProperty("Company")]
        public string Company { get; set; }
        
        [JsonProperty("Status")]
        public string Status { get; set; }

        [JsonProperty("Code")]
        public int Code { get; set; }

        [JsonProperty("Message")]
        public string Message { get; set; }

        [JsonProperty("Data")]
        public object Data { get; set; }
        public string IsEdit { get; set; }
        public string IsAdd { get; set; }
        public string IsDelete { get; set; }
    }

    public class ApiErrorResponse : ApiResponse
    {
        public HttpStatusCode StatusCode { get; set; }

        public string Description { get; set; }

        public string Status { get; set; }
    }

    public class FileResponse : ApiResponse
    {
        public string FileName { get; set; }
        public byte[] File { get; set; }
    }
}
