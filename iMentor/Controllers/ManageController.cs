using iMentor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace iMentor.Controllers
{
    [RequireHttps]
    [RoutePrefix("api/manage")]
    public class ManageController : Controller
    {
        #region Views
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

        [AllowAnonymous]
        public ActionResult EditListing()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult EditUserRole()
        {
            return PartialView();
        }
        #endregion

        private iMAST_dbEntities db = new iMAST_dbEntities();

        [AllowAnonymous]
        public JsonResult GetListings()
        {
            var result = db.ListingModels.ToList();
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetListingById(string locationId)
        {
            //var id = int.Parse(locationId);
            //var result = db.ListingModels.Where(x => x.ID == id).FirstOrDefault();
            var result = locationId;
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}