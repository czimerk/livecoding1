using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LiveCoding.TestWebApi.Models
{
    public class CalendarEvent
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsImportant { get; set; }
    }
}
