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
    
    public partial class Applicant
    {
        public int Id { get; set; }
        public int ListingId { get; set; }
        public int UserId { get; set; }
    
        public virtual ListingModel ListingModel { get; set; }
        public virtual iMentorUser iMentorUser { get; set; }
    }
}
