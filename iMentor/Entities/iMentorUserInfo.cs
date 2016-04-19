using iMentor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace iMentor.Entities
{
    [DataContract]
    public class iMentorUserInfo
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string UrlId { get; set; }

        [DataMember]
        public string UserName { get; set; }

        [DataMember]
        public string FirstName { get; set; }

        [DataMember]
        public string LastName { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public int RoleId { get; set; }

        [DataMember]
        public string Role { get; set; }

        [DataMember]
        public bool ShowOnlyAssignedListings { get; set; }

        [DataMember]
        public int IconIndex { get; set; }

        
        [AllowAnonymous]
        public int GetRoleIdByUser(iMentorUser user)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var userRole = db.iMentorUserRoles.Where(x => x.UserId == user.Id).FirstOrDefault();

                var result = userRole.RoleId;

                return result;
            }
        }

        [AllowAnonymous]
        public string GetRoleName(iMentorUser user)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var userRole = db.iMentorUserRoles.Where(x => x.UserId == user.Id).FirstOrDefault();
                var role = db.iMentorRoles.Where(x => x.Id == userRole.RoleId).FirstOrDefault();

                var result = role.RoleName;

                return result;
            }
        } 
    }
}
