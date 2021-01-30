using LiveCoding.TestWebApi.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace LiveCoding.TestWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalendarEventController : ControllerBase
    {
        static List<CalendarEvent> eventList = new List<CalendarEvent>()
        {
            new CalendarEvent()
            {
                //538ba14a-fc2d-4d27-a804-677fadf97101
                Id = new Guid("538ba14a-fc2d-4d27-a804-677fadf97101"),
                Name = "Teszt esemény",
                IsImportant = false
            },
            new CalendarEvent()
            { 
                Id = new Guid("638ba14a-fc2d-4d27-a804-677fadf97101"),
                Name = "Fontos esemény",
                IsImportant = true
            }
        };
        // GET: api/calendarevent
        [HttpGet]
        public List<CalendarEvent> Get()
        {
            return eventList;
        }

        // GET api/calendarevent/538ba14a-fc2d-4d27-a804-677fadf97101
        [HttpGet("{id}")]
        public CalendarEvent Get(Guid id)
        {
            return eventList.FirstOrDefault(p => p.Id == id);
        }

        // POST api/calendarevent
        [HttpPost]
        public bool Post([FromBody] CalendarEvent value)
        {
            if (eventList.FindIndex(p => p.Id == value.Id) < 0)
            {
                eventList.Add(value);
                return true;
            }
            else 
            {
                return false;
            }
           
        }

        // PUT api/calendarevent/538ba14a-fc2d-4d27-a804-677fadf97101
        [HttpPut("{id}")]
        public bool Put(Guid id, [FromBody] CalendarEvent value)
        {
            var index = eventList.FindIndex(p => p.Id == id);
            if (index < 0)
            {
                return false;
            }
            else 
            {
                eventList[index] = value;
                return true;
            }
        }

        // DELETE api/calendarevent/538ba14a-fc2d-4d27-a804-677fadf97101
        [HttpDelete("{id}")]
        public bool Delete(Guid id)
        {
            var index = eventList.FindIndex(p => p.Id == id);
            if (index < 0)
            {
                return false;
            }
            else
            {
                eventList.RemoveAt(index);
                return true;
            }
        }
    }
}
