using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    [RequireHttps]
    [RoutePrefix("api/Home")]
    public class HomeController : Controller
    {
        private MAST2015_dbEntities db = new MAST2015_dbEntities();

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Home()
        {
            return PartialView();
        }

        public ActionResult Listings()
        {
            return PartialView();
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }

        //Testing SQL -> AngularJS code
        [HttpGet, Route("getuser")]
        public String GetUser()
        {
            return db.AspNetUsers.First().Email;
        }
    }
}