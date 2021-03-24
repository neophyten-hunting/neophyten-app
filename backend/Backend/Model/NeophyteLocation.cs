using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace Backend.Model
{
    public class NeophyteLocation
    {
        public NeophyteLocation()
        {
            this.WorkSteps = new List<WorkStep>();
        }

        [JsonProperty("id")]
        public string Id { get; set; }

        public double Longitude { get; set; }

        public double Latitude { get; set; }

        public string Location { get; set; }

        public string Reporter { get; set; }

        public string Description { get; set; }

        public string PlantName { get; set; }

        public string Source { get; set; }

        public IList<WorkStep> WorkSteps { get; set; }

        public DateTime CreatedDateTime { get; set; }

        public DateTime? ModifiedDateTime { get; set; }
    }
}
