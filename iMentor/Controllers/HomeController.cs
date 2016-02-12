using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using iMentor.Models;
using iMentor.Entities;
using System.Web.Mvc;
using System.Data.Entity;

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


        private iMAST_dbEntities db = new iMAST_dbEntities();

        [AllowAnonymous]
        public JsonResult GetListings()
        {
            var result = db.ListingModels.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}