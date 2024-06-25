using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IO;
using propertymanagement.web.Common;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;

namespace propertymanagement.web.Common
{
    public class clsCommon
    {
        public static void SetConfiguration(Configuration config)
        {
            var json = JsonConvert.SerializeObject(config);
            System.IO.File.WriteAllText("appsettings.json", json);
        }

        public static Configuration Configuration
        {
            get
            {
                string json = System.IO.File.ReadAllText("appsettings.json");
                var data = JsonConvert.DeserializeObject<Configuration>(json);
                return data;
            }
        }
    }
}
