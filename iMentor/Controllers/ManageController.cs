using iMentor.Models;
using iMentor.Entities;
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

            var r = Json(listings, JsonRequestBehavior.AllowGet);
            return r;
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
        public JsonResult GetUsers()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var iMentorUsers = db.iMentorUsers.ToList();
                List<iMentorUserInfo> users = new List<iMentorUserInfo>();
                
                foreach(iMentorUser user in iMentorUsers)
                {
                    var u = new iMentorUserInfo();
                    u.UserName = user.UserName;
                    u.Email = user.Email;
                    u.RoleId = user.RoleId;
                    u.Role = GetRoleByUser(user);
                    users.Add(u);
                }

                return Json(users, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public JsonResult GetUserById(string userId)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var id = Convert.ToInt32(userId);
                var result = db.iMentorUsers.Where(x => x.Id == id).FirstOrDefault();

                return Json(result, JsonRequestBehavior.AllowGet);
            }
        }


        [AllowAnonymous]
        public JsonResult GetRoles()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var results = db.iMentorRoles.ToList();
                
                return Json(results, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public string GetRoleByUser(iMentorUser user)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var userRole = db.iMentorRoles.Where(x => x.Id == user.RoleId).FirstOrDefault();
                var result = userRole.RoleName;

                return result;
            }
        }
    }
}