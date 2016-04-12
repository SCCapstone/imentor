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
        public ActionResult StudentView()
        {
            return PartialView();
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }
        #endregion


        private iMAST_dbEntities db = new iMAST_dbEntities();

        [AllowAnonymous]
        public JsonResult GetListings()
        {
            var result = db.ListingModels.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}