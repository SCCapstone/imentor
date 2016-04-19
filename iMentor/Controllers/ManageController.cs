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
        public ActionResult Listing()
        {
            return PartialView();
        }

        [Authorize(Roles = "Administrator")]
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
                    l.Id = listing.Id;
                    l.UrlId = listing.UrlId;
                    l.Title = listing.Title;
                    l.StartDate = listing.StartDate;
                    l.EndDate = listing.EndDate;
                    l.Area = listing.Area;
                    l.AgeGroup = listing.AgeGroup;
                    l.Frequency = listing.Frequency;
                    l.Description = listing.Description;
                    l.HangoutUrl = listing.HangoutUrl;
                    l.HangoutStart = listing.HangoutStart;
                    l.TeacherId = listing.TeacherId;
                    l.Open = listing.Open;
                    l.Teacher = l.GetTeacherUserName(listing);

                    listings.Add(l);
                }

                CheckForExpiredListings(listings);
                CheckForExpiredHangouts(listings);

                return Json(listings, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public JsonResult AddListing(ListingModel listing)
        {
            if (listing != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    try
                    {
                        db.ListingModels.Add(listing);
                        db.SaveChanges();
                        
                        //Return the listing because it now has its new Id
                        return Json(listing, JsonRequestBehavior.AllowGet);
                    }
                    catch(Exception err)
                    {
                        return Json(err, JsonRequestBehavior.AllowGet);
                    }
                }
            }
            else
            {
                return Json("Invalid listing", JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public string DeleteListing(ListingModel listing)
        {
            if (listing != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var l = db.ListingModels.Where(x => x.Id == listing.Id).FirstOrDefault();

                    if (l != null)
                    {
                        DeleteAssociatedAssignments(l);
                        DeleteAssociatedApplications(l);

                        db.ListingModels.Remove(l);
                        db.SaveChanges();
                        return "Listing Deleted";
                    }
                    else
                    {
                        return "Invalid Listing";
                    }
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
                    int no = Convert.ToInt32(listing.Id);
                    var l = db.ListingModels.Where(x => x.Id == no).FirstOrDefault();

                    if (l != null)
                    {
                        l.Title = listing.Title;
                        l.UrlId = listing.UrlId;
                        l.StartDate = listing.StartDate;
                        l.EndDate = listing.EndDate;
                        l.Area = listing.Area;
                        l.AgeGroup = listing.AgeGroup;
                        l.Frequency = listing.Frequency;
                        l.Description = listing.Description;
                        l.HangoutUrl = listing.HangoutUrl;
                        l.HangoutStart = listing.HangoutStart;
                        l.TeacherId = listing.TeacherId;
                        l.Open = listing.Open;
                        db.SaveChanges();
                        return "Listing Updated";
                    }
                    else
                    {
                        return "Invalid Listing";
                    }
                }
            }
            else
            {
                return "Invalid Listing";
            }
        }

        [AllowAnonymous]
        public JsonResult GetListingsByCurrentUser()
        {
            var currentUserName = User.Identity.GetUserName();
            List<ListingInfo> listings = new List<ListingInfo>();

            if (!currentUserName.Equals(""))
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    //Get the current user from the database
                    var iMentorUser = db.iMentorUsers.Where(x => x.UserName.Equals(currentUserName)).FirstOrDefault();

                    //Get current users assigned listings
                    var assignments = db.AssignedListings.Where(x => x.UserId == iMentorUser.Id);

                    //Get listings base on the assignments
                    var assidnedListings = new List<ListingModel>();
                    foreach (AssignedListing assignment in assignments)
                    {
                        assidnedListings.Add(db.ListingModels.Where(x => x.Id == assignment.ListingId).FirstOrDefault());
                    }

                    

                    foreach (ListingModel listing in assidnedListings)
                    {
                        var l = new ListingInfo();
                        l.Id = listing.Id;
                        l.UrlId = listing.UrlId;
                        l.Title = listing.Title;
                        l.StartDate = listing.StartDate;
                        l.EndDate = listing.EndDate;
                        l.Area = listing.Area;
                        l.AgeGroup = listing.AgeGroup;
                        l.Frequency = listing.Frequency;
                        l.Description = listing.Description;
                        l.HangoutUrl = listing.HangoutUrl;
                        l.HangoutStart = listing.HangoutStart;
                        l.TeacherId = listing.TeacherId;
                        l.Open = listing.Open;
                        l.Teacher = l.GetTeacherUserName(listing);

                        listings.Add(l);
                    }

                    CheckForExpiredListings(listings);
                }
            }

            return Json(listings, JsonRequestBehavior.AllowGet);
        }
        
        [AllowAnonymous]
        public JsonResult GetUsers()
        {
            List<iMentorUserInfo> users = GetAllUsers();

            return Json(users, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetCurrentUser()
        {
            var currentUserName = User.Identity.GetUserName(); //Get current User's username
            var user = new iMentorUserInfo();

            if (!currentUserName.Equals("")) { 
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var iMentorUser = db.iMentorUsers.Where(x => x.UserName.Equals(currentUserName)).FirstOrDefault();

                    if (iMentorUser != null)
                    {
                        user.Id = iMentorUser.Id;
                        user.UserName = iMentorUser.UserName;
                        user.FirstName = iMentorUser.FirstName;
                        user.LastName = iMentorUser.LastName;
                        user.Email = iMentorUser.Email;
                        user.RoleId = user.GetRoleIdByUser(iMentorUser);
                        user.Role = user.GetRoleName(iMentorUser);
                        user.ShowOnlyAssignedListings = iMentorUser.ShowOnlyAssignedListings;
                        user.IconIndex = iMentorUser.IconIndex;
                    }


                }
            }

            return Json(user, JsonRequestBehavior.AllowGet);
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

                    if (u != null)
                    { 
                        u.Id = user.Id;
                        u.UrlId = user.UrlId;
                        u.UserName = user.UserName;
                        u.FirstName = user.FirstName;
                        u.LastName = user.LastName;
                        u.Email = user.Email;
                        u.ShowOnlyAssignedListings = user.ShowOnlyAssignedListings;
                        u.IconIndex = user.IconIndex;

                        var role = db.iMentorRoles.Where(x => x.RoleName.Equals(user.Role)).FirstOrDefault();
                        var userRole = db.iMentorUserRoles.Where(x => x.UserId == user.Id).FirstOrDefault();
                        userRole.RoleId = role.Id;

                        db.SaveChanges();
                        return "User Updated";
                    }
                    else
                    {
                        return "Invalid User";
                    }
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
                    
                    if(aspUser != null)
                    {
                        aspUser.UserName = user.UserName;
                        aspUser.Email = user.Email;
                        
                        db.SaveChanges();

                        return "Asp User Updated";
                    }
                    else
                    {
                        return "Invalid Asp User";
                    }
                    
                }
            }
            else
            {
                return "Invalid Asp User";
            }
        }

        [AllowAnonymous]
        public JsonResult GetUsersByListing(string data)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var users = new List<iMentorUserInfo>();

                if (data != null)
                {
                    var userIds = new List<int>();
                    int id = Convert.ToInt32(data);

                    if (id > 0)
                    {
                        var listing = db.ListingModels.Where(x => x.Id == id).FirstOrDefault();

                        var assignments = db.AssignedListings.Where(x => x.ListingId == listing.Id).ToList();

                        foreach (AssignedListing assignment in assignments)
                        {
                            var user = db.iMentorUsers.Where(x => x.Id == assignment.UserId).FirstOrDefault();

                            var u = new iMentorUserInfo();
                            u.Id = user.Id;
                            u.UserName = user.UserName;
                            u.FirstName = user.FirstName;
                            u.LastName = user.LastName;
                            u.Email = user.Email;
                            u.RoleId = u.GetRoleIdByUser(user);
                            u.Role = u.GetRoleName(user);
                            u.ShowOnlyAssignedListings = user.ShowOnlyAssignedListings;
                            u.IconIndex = user.IconIndex;

                            users.Add(u);
                        }
                    }
                }

                return Json(users, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public JsonResult GetStudents()
        {
            List<iMentorUserInfo> allUsers = GetAllUsers();
            List<iMentorUserInfo> students = new List<iMentorUserInfo>();

            foreach (iMentorUserInfo user in allUsers)
            {
                if (user.RoleId == 1)
                {
                    students.Add(user);
                }
            }

            return Json(students, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetMentors()
        {
            List<iMentorUserInfo> allUsers = GetAllUsers();
            List<iMentorUserInfo> mentors = new List<iMentorUserInfo>();

            foreach (iMentorUserInfo user in allUsers)
            {
                if(user.RoleId == 2)
                {
                    mentors.Add(user);
                }
            }

            return Json(mentors, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetTeachers()
        {
            List<iMentorUserInfo> allUsers = GetAllUsers();
            List<iMentorUserInfo> teachers = new List<iMentorUserInfo>();

            foreach (iMentorUserInfo user in allUsers)
            {
                if (user.RoleId >= 3)
                {
                    teachers.Add(user);
                }
            }

            return Json(teachers, JsonRequestBehavior.AllowGet);
        }

        

        [AllowAnonymous]
        public string AddParticipant(AssignedListing assignment)
        {
            if (assignment != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    try
                    {
                        db.AssignedListings.Add(assignment);
                        db.SaveChanges();

                        return "Assignment Added";
                    }
                    catch (Exception err)
                    {
                        return err.ToString();
                    }
                }
            }
            else
            {
                return "Invalid Assignment";
            }
        }

        [AllowAnonymous]
        public string RemoveParticipant(AssignedListing assignment)
        {
            if (assignment != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var a = db.AssignedListings.Where(x => x.Id == assignment.Id).FirstOrDefault();

                    if (a != null)
                    {
                        db.AssignedListings.Remove(a);
                        db.SaveChanges();
                        return "Assignment Removed";
                    }
                    else
                    {
                        return "Invalid Assignment";
                    }
                }
            }
            else
            {
                return "Invalid Assignment";
            }
        }

        [AllowAnonymous]
        public JsonResult GetAssignments()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var assignments = db.AssignedListings.ToList();
                
                return Json(assignments, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public JsonResult GetApplicants()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var applicants = db.Applicants.ToList();

                return Json(applicants, JsonRequestBehavior.AllowGet);
            }
        }

        [AllowAnonymous]
        public string AddApplicant(Applicant appplicant)
        {
            if (appplicant != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    db.Applicants.Add(appplicant);
                    db.SaveChanges();

                    return "Assignment Added";
                }
            }
            else
            {
                return "Invalid Assignment";
            }
        }

        [AllowAnonymous]
        public string RemoveApplicant(Applicant appplicant)
        {
            if (appplicant != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var a = db.Applicants.Where(x => x.UserId == appplicant.UserId && x.ListingId == appplicant.ListingId).FirstOrDefault();

                    if (a != null)
                    {
                        db.Applicants.Remove(a);
                        db.SaveChanges();
                        return "Applicant Removed";
                    }
                    else
                    {
                        return "Invalid Applicant";
                    }
                }
            }
            else
            {
                return "Invalid Applicant";
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


        #region Helper Methods

        [AllowAnonymous]
        public List<iMentorUserInfo> GetAllUsers()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var iMentorUsers = db.iMentorUsers.ToList();

                List<iMentorUserInfo> users = new List<iMentorUserInfo>();

                foreach (iMentorUser user in iMentorUsers)
                {
                    var u = new iMentorUserInfo();

                    u.Id = user.Id;
                    u.UserName = user.UserName;
                    u.FirstName = user.FirstName;
                    u.LastName = user.LastName;
                    u.Email = user.Email;
                    u.RoleId = u.GetRoleIdByUser(user);
                    u.Role = u.GetRoleName(user);
                    u.ShowOnlyAssignedListings = user.ShowOnlyAssignedListings;
                    u.IconIndex = user.IconIndex;

                    users.Add(u);
                }

                return users;
            }
        }

        [AllowAnonymous]
        private void CheckForExpiredListings(List<ListingInfo> listings)
        {
            DateTime currentDate = DateTime.Now;

            foreach (ListingInfo listing in listings)
            {
                if (listing.Open)
                {
                    DateTime listingEndDate = listing.EndDate ?? DateTime.Now;

                    if (DateTime.Compare(currentDate, listingEndDate) > 0)
                    {
                        listing.Open = false;

                        UpdateListing(listing);
                    }
                }
            }
        }

        [AllowAnonymous]
        private void CheckForExpiredHangouts(List<ListingInfo> listings)
        {
            DateTime currentDate = DateTime.Now;

            foreach (ListingInfo listing in listings)
            {
                if (listing.HangoutUrl != null)
                {
                    DateTime listingStartDate = listing.StartDate ?? DateTime.Now;
                    DateTime listingEndDate = listing.EndDate ?? DateTime.Now;

                    double hourDiff = listingEndDate.Hour - listingStartDate.Hour;
                    double minuteDiff = listingEndDate.Minute - listingStartDate.Minute;
                    
                    DateTime hangoutStart = listing.HangoutStart ?? DateTime.Now;
                    DateTime expireTime = hangoutStart.AddHours(hourDiff );
                    expireTime = expireTime.AddMinutes(minuteDiff);

                    if(currentDate > expireTime)
                    {
                        listing.HangoutUrl = null;
                        listing.HangoutStart = null;

                        UpdateListing(listing);
                    }
                }
            }
        }

        [AllowAnonymous]
        private void DeleteAssociatedAssignments(ListingModel listing)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var assignments = db.AssignedListings.Where(x => x.ListingId == listing.Id).ToList();

                foreach (AssignedListing assignment in assignments)
                {
                    db.AssignedListings.Remove(assignment);
                    db.SaveChanges();
                }
            }
        }

        [AllowAnonymous]
        private void DeleteAssociatedApplications(ListingModel listing)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var applicants = db.Applicants.Where(x => x.ListingId == listing.Id).ToList();

                foreach (Applicant applicant in applicants)
                {
                    db.Applicants.Remove(applicant);
                    db.SaveChanges();
                }
            }
        }


        #endregion

        //******************* FOR UNIT TESTING PURPOSES ONLY! *******************\\

        [AllowAnonymous]
        public ListingModel ReturnLastAddedListing()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var lastAdded = (from n in db.ListingModels
                                     orderby n.Id descending
                                     select n).FirstOrDefault();
                    return lastAdded;

                }
        }

        [AllowAnonymous]
        public iMentorUser ReturnLastAddedUser()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var lastAdded = (from n in db.iMentorUsers
                                 orderby n.Id descending
                                 select n).FirstOrDefault();
                return lastAdded;

            }
        }

        [AllowAnonymous]
        public AspNetUser ReturnAspUser(string email)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var user = db.AspNetUsers.Where(x => x.Email == email).FirstOrDefault();
                return user;

            }
        }

        [AllowAnonymous]
        public AssignedListing ReturnLastAddedAssignment()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var lastAdded = (from n in db.AssignedListings
                                 orderby n.Id descending
                                 select n).FirstOrDefault();
                return lastAdded;

            }
        }
    }
}