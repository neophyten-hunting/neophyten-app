using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace Backend.Model
{
    public class WorkStep
    {
        public DateTime CreatedDateTime { get; set; }

        [JsonConverter(typeof(StringEnumConverter))] 
        public WorkState State { get; set; }

        public string Description { get; set; }
    }
}
