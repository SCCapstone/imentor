using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    public class ManageController : Controller
    {

        [AllowAnonymous]
        public ActionResult ManageUsers()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult ManageListings()
        {
            return PartialView();
        }
    }
}