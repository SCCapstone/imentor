using System.Linq;
using iMentor.Models;
using System.Web.Mvc;
using iMentor.Models.Security;

namespace iMentor.Controllers
{
    [RequireHttps]
    [RoutePrefix("api/home")]
    public class HomeController : Controller
    {
        #region Views
        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        [AllowAnonymous]
        public ActionResult Home()
        {
            return PartialView();
        }

        [AccessDeniedAuthorize(Roles = "Read Only, Mentor, Teacher, Administrator")]
        public ActionResult Calendar()
        {
            return PartialView();
        }

        [AllowAnonymous]
        [ActionName("404")]
        public ActionResult PageNotFound()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult Help()
        {
            return PartialView();
        }

        [AccessDeniedAuthorize(Roles = "Student")]
        public ActionResult StudentView()
        {
            return PartialView();
        }

        [AccessDeniedAuthorize(Roles = "Mentor, Teacher, Administrator")]
        public ActionResult ViewProfile()
        {
            return PartialView();
        }
        
        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }
        #endregion
        
    }
}