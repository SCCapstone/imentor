using System.Linq;
using iMentor.Models;
using System.Web.Mvc;

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

        [AllowAnonymous]
        public ActionResult Calendar()
        {
            return PartialView();
        }

        [AllowAnonymous]
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

        [Authorize(Roles = "Student")]
        public ActionResult StudentView()
        {
            return PartialView();
        }

        [AllowAnonymous]
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