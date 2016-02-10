using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace iMentor.Models
{
    public class ListingModels
    {
        public int ID { get; set; }
        public string Title { get; set; }
        [DisplayFormat(DataFormatString = "{0:MM dd yyyy}")]
        [DataType(DataType.Date)]
        public string StartDate { get; set; }
        [DataType(DataType.Date)]
        public string EndDate { get; set; }
        public string Area { get; set; }
        public string Frequency { get; set; }
        public string Description { get; set; }
        public string Mentor { get; set; }
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
        [DataType(DataType.Url)]
        public string URL { get; set; }
        public bool Open { get; set; }
    }
}