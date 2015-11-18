using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace iMentor.Models
{
    public class ListingModels
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public string Area { get; set; }
        public string Frequency { get; set; }
        public string Description { get; set; }
        public string Mentor { get; set; }
        public string URL { get; set; }
        public string Open { get; set; }
    }
}