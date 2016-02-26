using iMentor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace iMentor.Entities
{
    [DataContract]
    class ListingModelInfo
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
        public string HangoutUrl { get; set; }

        [DataMember]
        public Nullable<int> TeacherId { get; set; }

        [DataMember]
        public bool Open { get; set; }

        [DataMember]
        public string Teacher { get; set; }

        
        public string GetTeacherName(ListingModel listing)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var teacher = db.iMentorUsers.Where(x => x.Id == listing.TeacherId).FirstOrDefault();
                var result = teacher.UserName;

                return result;
            }
        }
    }
}
