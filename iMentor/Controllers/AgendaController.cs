using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DHTMLX.Scheduler;

namespace iMentor.Controllers
{
    public class AgendaController : Controller
    {
        //
        // GET: /Home/
        public ActionResult Index()
        {
            var scheduler = new DHXScheduler(this);
            scheduler.Height = 600;
            scheduler.Skin = DHXScheduler.Skins.Flat;

            return View(scheduler);
        }
    }
}