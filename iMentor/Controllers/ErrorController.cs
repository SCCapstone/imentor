using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    class ErrorController : Controller
    {
        [ActionName("404")]
        public ActionResult Error404()
        {
            return View("Error");
        }
    }
}
