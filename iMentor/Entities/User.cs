using Microsoft.AspNet.Identity.EntityFramework;
using System.Runtime.Serialization;

namespace iMentor.Entities
{
    [DataContract]
    public class User : IdentityUser
    {
        [DataMember]
        public bool isLoggedIn { get; set; }
    }
}
