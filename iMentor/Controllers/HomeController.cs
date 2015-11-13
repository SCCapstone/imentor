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
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }

        //Testing SQL -> AngularJS code
        public String GetUser()
        {
            MAST2015_dbEntities e = new MAST2015_dbEntities();
            AspNetUser tempUser = e.AspNetUsers.First();
            return tempUser.Email;
        }
    }
}