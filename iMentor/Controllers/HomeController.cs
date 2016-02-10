using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iMentor.Models;
using System.Web.Mvc;
using iMentor.Models;

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
        public ActionResult Listings()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult Calendar()
        {
            return PartialView();
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }
        #endregion


        private ApplicationDbContext db = new ApplicationDbContext();

        [Route ("getlistings")]
        public List<ListingModel> GetListings()
        {
            return db.ListingModels.ToList();
        }

        [Route("getcount")]
        public int GetCount()
        {

            int count = db.ListingModels.Count();

            return count;
        }

    }
}