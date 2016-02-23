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
        [System.Web.Mvc.AllowAnonymous]
        public ActionResult ManageUsers()
        {
            return PartialView();
        }

        [System.Web.Mvc.AllowAnonymous]
        public ActionResult ManageListings()
        {
            return PartialView();
        }

        [System.Web.Mvc.AllowAnonymous]
        public ActionResult EditListing()
        {
            return PartialView();
        }

        [System.Web.Mvc.AllowAnonymous]
        public ActionResult EditUserRole()
        {
            return PartialView();
        }
        #endregion

        private iMAST_dbEntities db = new iMAST_dbEntities();

        [AllowAnonymous]
        public JsonResult GetListings()
        {
            var listingsController = new ListingController();
            var listings = listingsController.GetListingModels();

            return Json(listings, JsonRequestBehavior.AllowGet);
        }


        [AllowAnonymous]
        public string AddListing(ListingModel listing)
        {
            if (listing != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    db.ListingModels.Add(listing);
                    db.SaveChanges();

                    return "Listing Added";
                }
            }
            else
            {
                return "Invalid Listing";
            }
        }

        [AllowAnonymous]
        public string DeleteListing(ListingModel listing)
        {
            if (listing != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var l = db.ListingModels.Where(x => x.ID == listing.ID).FirstOrDefault();
                    db.ListingModels.Remove(l);
                    db.SaveChanges();
                    return "Listing Deleted";
                }
            }
            else
            {
                return "Invalid Listing";
            }
        }

        [AllowAnonymous]
        public string UpdateListing(ListingModel listing)
        {
            if (listing != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    int no = Convert.ToInt32(listing.ID);
                    var l = db.ListingModels.Where(x => x.ID == no).FirstOrDefault();
                    l.Title = listing.Title;
                    l.StartDate = listing.StartDate;
                    l.EndDate = listing.EndDate;
                    l.Area = listing.Area;
                    l.Frequency = listing.Frequency;
                    l.Description = listing.Description;
                    l.Mentor = listing.Mentor;
                    l.Email = listing.Email;
                    l.HangoutUrl = listing.HangoutUrl;
                    l.Open = listing.Open;
                    db.SaveChanges();
                    return "Listing Updated";
                }
            }
            else
            {
                return "Invalid Listing";
            }
        }



        [AllowAnonymous]
        public JsonResult GetAspUsers()
        {
            return null;
        }

        [AllowAnonymous]
        public JsonResult GetUserById(string userId)
        {
            //var id = int.Parse(locationId);
            //var result = db.ListingModels.Where(x => x.ID == id).FirstOrDefault();
            var result = userId;
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}