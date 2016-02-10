using System;
using System.Runtime.Serialization;

namespace iMentor.Entities
{
    [DataContract]
    public class Listing
    {
        [DataMember]
        public int ID { get; set; }

        [DataMember]
        public string Title { get; set; }

        [DataMember]
        public Nullable<System.DateTime> StartDate { get; set; }

        [DataMember]
        public Nullable<System.DateTime> EndDate { get; set; }

        [DataMember]
        public string Area { get; set; }

        [DataMember]
        public string Frequency { get; set; }

        [DataMember]
        public string Description { get; set; }

        [DataMember]
        public string Mentor { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public string URL { get; set; }

        [DataMember]
        public bool Open { get; set; }
    }
}