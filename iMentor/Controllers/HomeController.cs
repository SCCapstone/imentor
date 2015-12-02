using System.Linq;
using System.Web.Mvc;
using System.Web.Security;

namespace iMentor.Controllers
{
    [RequireHttps]
    public class HomeController : Controller
    {
        private MAST2015_dbEntities db = new MAST2015_dbEntities();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }

        public ActionResult ShowUserRoles()
        {
            string[] roleNames = Roles.GetRolesForUser();
            return View(roleNames);
        }

        [AllowAnonymous]
        public string GetUser()
        {
            AspNetUser tempUser = db.AspNetUsers.First();
            return tempUser.UserName;
        }
    }
}