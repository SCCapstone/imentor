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

        //Testing SQL -> AngularJS code
        public String GetMentor()
        {
            MAST2015_dbEntities e = new MAST2015_dbEntities();
            AspNetUser tempUser = e.AspNetUsers.First();
            return tempUser.Id;
        }
    }


}