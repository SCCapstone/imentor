using iMentor.Entities;
using iMentor.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace iMentor.BL
{
    class RoleServiceMstr
    {
        [AllowAnonymous]
        public List<iMentorRole> GetRoles()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                return db.iMentorRoles.ToList();
            }
        }

        [AllowAnonymous]
        public string RemoveUserRole(iMentorUserInfo user)
        {
            if(user != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var u = db.iMentorUserRoles.Where(x => x.UserId == user.Id).FirstOrDefault();

                    if(u != null)
                    {
                        db.iMentorUserRoles.Remove(u);
                        db.SaveChanges();

                        return "User Role Removed";
                    }
                    else
                    {
                        return "No user role found";
                    }
                    
                }
            }
            else
            {
                return "Invalid User Role";
            }
        }
    }
}
