using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    public class StudentsController : Controller
    {
        // GET: Students
        public ActionResult Index()
        {
            return View();
        }

        //Testing SQL -> AngularJS code
        public String GetStudents()
        {
            MAST2015_dbEntities e = new MAST2015_dbEntities();
            AspNetUser tempUser = e.AspNetUsers.First();
            return tempUser.Id;
        }
    }
}