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
        public string UserName { get; set; }

        [DataMember]
        public string Email { get; set; }

        [DataMember]
        public int RoleId { get; set; }

        [DataMember]
        public string Role { get; set; }


        [AllowAnonymous]
        public string GetRoleByUser(iMentorUser user)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var userRole = db.iMentorRoles.Where(x => x.Id == user.RoleId).FirstOrDefault();
                var result = userRole.RoleName;

                return result;
            }
        }

        [AllowAnonymous]
        public int GetRoleIdByName(string roleName)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var role = db.iMentorRoles.Where(x => x.RoleName.Equals(roleName)).FirstOrDefault();
                var result = role.Id;

                return result;
            }
        }
    }
}
