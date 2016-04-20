using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Security;

namespace iMentor.Models.Security
{
    public class iMentorRoleProvider : RoleProvider
    {
        public override string ApplicationName
        {
            get
            {
                throw new NotImplementedException();
            }

            set
            {
                throw new NotImplementedException();
            }
        }

        public override void AddUsersToRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override void CreateRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool DeleteRole(string roleName, bool throwOnPopulatedRole)
        {
            throw new NotImplementedException();
        }

        public override string[] FindUsersInRole(string roleName, string usernameToMatch)
        {
            throw new NotImplementedException();
        }

        public override string[] GetAllRoles()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                return db.iMentorRoles.Select(x => x.RoleName).ToArray();
            }
        }

        public override string[] GetRolesForUser(string username)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                iMentorUser user = db.iMentorUsers.FirstOrDefault(u => u.UserName.Equals(username, StringComparison.CurrentCultureIgnoreCase) || u.Email.Equals(username, StringComparison.CurrentCultureIgnoreCase));
                
                iMentorUserRole userRole = db.iMentorUserRoles.FirstOrDefault(x => x.UserId == user.Id);
                iMentorRole role = db.iMentorRoles.FirstOrDefault(x => x.Id == userRole.RoleId);
                var roles = new string[] { role.RoleName };

                if (roles != null)
                    return roles;
                else
                    return new string[] { };
            }
        }

        public override string[] GetUsersInRole(string roleName)
        {
            throw new NotImplementedException();
        }

        public override bool IsUserInRole(string username, string roleName)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                iMentorUser user = db.iMentorUsers.FirstOrDefault(u => u.UserName.Equals(username, StringComparison.CurrentCultureIgnoreCase) || u.Email.Equals(username, StringComparison.CurrentCultureIgnoreCase));

                iMentorUserRole userRole = db.iMentorUserRoles.FirstOrDefault(x => x.UserId == user.Id);
                iMentorRole role = db.iMentorRoles.FirstOrDefault(x => x.Id == userRole.RoleId);
                var roles = new string[] { role.RoleName };

                if (user != null)
                    return roles.Any(r => r.Equals(roleName, StringComparison.CurrentCultureIgnoreCase));
                else
                    return false;
            }
        }

        public override void RemoveUsersFromRoles(string[] usernames, string[] roleNames)
        {
            throw new NotImplementedException();
        }

        public override bool RoleExists(string roleName)
        {
            throw new NotImplementedException();
        }
    }
}
