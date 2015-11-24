using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    [RequireHttps]
    public class HomeController : Controller
    {
        private MAST2015_dbEntities db = new MAST2015_dbEntities();

        public ActionResult Index()
        {
            return View(db.AspNetUsers.ToList());
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }

        //Testing SQL -> AngularJS code
        public String GetUser()
        {
            return null;
        }

       
    }
}