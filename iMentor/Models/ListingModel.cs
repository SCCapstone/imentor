//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace iMentor.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ListingModel
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public string Area { get; set; }
        public string Frequency { get; set; }
        public string Description { get; set; }
        public string Mentor { get; set; }
        public string Email { get; set; }
        public string URL { get; set; }
        public bool Open { get; set; }
    }
}