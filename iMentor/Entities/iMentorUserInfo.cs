using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;

namespace iMentor.Entities
{
    [DataContract]
    class iMentorUserInfo
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public int RoleId { get; set; }

        [DataMember]
        public string Role { get; set; }
    }
}
