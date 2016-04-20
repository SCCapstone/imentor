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
    }
}
