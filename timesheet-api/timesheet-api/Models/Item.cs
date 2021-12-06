using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace timesheet_api.Models
{
    public class Item
    {
        public string Title { get; set; }
        public int Hours { get; set; }
        public string Date { get; set; }

        public Item()
        {
        }
    }
}