using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    public class MentorsController : Controller
    {
        // GET: Mentors
        public ActionResult Index()
        {
            return View();
        }
    }


}