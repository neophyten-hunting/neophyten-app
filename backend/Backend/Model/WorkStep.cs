using System;
using System.Collections.Generic;
using System.Text;

namespace Backend.Model
{
    public class WorkStep
    {
        public DateTime CreateDateTime { get; set; }

        public WorkState State { get; set; }

        public string Description { get; set; }
    }
}
