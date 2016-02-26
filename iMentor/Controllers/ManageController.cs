using iMentor.Models;
using iMentor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;

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
        public ActionResult EditUser()
        {
            return PartialView();
        }
        #endregion

        private iMAST_dbEntities db = new iMAST_dbEntities();

        [AllowAnonymous]
        public JsonResult GetListings()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var listingModels = db.ListingModels.ToList();
                List<ListingInfo> listings = new List<ListingInfo>();

                foreach (ListingModel listing in listingModels)
                {
                    var l = new ListingInfo();
                    l.ID = listing.ID;
                    l.Title = listing.Title;
                    l.StartDate = listing.StartDate;
                    l.EndDate = listing.EndDate;
                    l.Area = listing.Area;
                    l.Frequency = listing.Frequency;
                    l.Description = listing.Description;
                    l.Mentor = listing.Mentor;
                    l.Email = listing.Email;
                    l.HangoutUrl = listing.HangoutUrl;
                    l.TeacherId = listing.TeacherId;
                    l.Open = listing.Open;
                    l.Teacher = l.GetTeacherUserName(listing);

                    listings.Add(l);
                }

                return Json(listings, JsonRequestBehavior.AllowGet);
            }
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
        public string UpdateListing(ListingInfo listing)
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
                    l.TeacherId = listing.GetTeacherIdByName(listing.Teacher);
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
                    u.Id = user.Id;
                    u.UserName = user.UserName;
                    u.Email = user.Email;
                    u.RoleId = user.RoleId;
                    u.Role = u.GetRoleByUser(user);

                    users.Add(u);
                }

                return Json(users, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public JsonResult GetCurrentUser()
        {
            var currentUserName = User.Identity.GetUserName(); //Get current User's username

            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var iMentorUser = db.iMentorUsers.Where(x => x.UserName.Equals(currentUserName)).FirstOrDefault();
                
                var user = new iMentorUserInfo();
                user.Id = iMentorUser.Id;
                user.UserName = iMentorUser.UserName;
                user.Email = iMentorUser.Email;
                user.RoleId = iMentorUser.RoleId;
                user.Role = user.GetRoleByUser(iMentorUser);

                return Json(user, JsonRequestBehavior.AllowGet);
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
        public string UpdateUser(iMentorUserInfo user)
        {
            if (user != null)
            {
                UpdateAspUser(user);
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    int no = Convert.ToInt32(user.Id);
                    var u = db.iMentorUsers.Where(x => x.Id == no).FirstOrDefault();

                    u.Id = user.Id;
                    u.UserName = user.UserName;
                    u.Email = user.Email;
                    u.RoleId = user.GetRoleIdByName(user.Role);

                    db.SaveChanges();
                    return "User Updated";
                }
            }
            else
            {
                return "Invalid User";
            }
        }

        [AllowAnonymous]
        public string UpdateAspUser(iMentorUserInfo user)
        {
            if (user != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var aspUser = db.AspNetUsers.Where(x => x.Email.Equals(user.Email)).FirstOrDefault();

                    aspUser.UserName = user.UserName;
                    aspUser.Email = user.Email;

                    //User.Identity.Name = aspUser.UserName;

                    db.SaveChanges();
                    return "User Updated";
                }
            }
            else
            {
                return "Invalid User";
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
    }
}