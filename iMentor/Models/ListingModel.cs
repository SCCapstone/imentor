namespace iMentor.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class ListingModel
    {
        public int ID { get; set; }

        public string Title { get; set; }

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public string Area { get; set; }

        public string Frequency { get; set; }

        public string Description { get; set; }

        public string Mentor { get; set; }

        public string Email { get; set; }

        public string URL { get; set; }

        public bool Open { get; set; }
    }
}
