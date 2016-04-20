using iMentor.Models;
using iMentor.Entities;
using System.Linq;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using iMentor.BL;
using iMentor.Models.Security;

namespace iMentor.Controllers
{
    [RequireHttps]
    [RoutePrefix("api/manage")]
    public class ManageController : Controller
    {
        #region Views
        [AccessDeniedAuthorize(Roles = "Teacher, Administrator")]
        public ActionResult ManageUsers()
        {
            return PartialView();
        }

        [AccessDeniedAuthorize(Roles = "Teacher, Administrator")]
        public ActionResult ManageListings()
        {
            return PartialView();
        }

        [AllowAnonymous]
        public ActionResult Listing()
        {
            return PartialView();
        }

        [AccessDeniedAuthorize(Roles = "Teacher, Administrator")]
        public ActionResult EditUser()
        {
            return PartialView();
        }
        #endregion

        #region Service Calls
        private iMentorUserServiceMstr iMentorUserService = new iMentorUserServiceMstr();
        private ListingServiceMstr listingService = new ListingServiceMstr();
        private ParticipantServiceMstr participantService = new ParticipantServiceMstr();
        private AssignmentServiceMstr assignmentService = new AssignmentServiceMstr();
        private RoleServiceMstr roleService = new RoleServiceMstr();


        [AllowAnonymous]
        public JsonResult GetListings()
        {
            var toReturn = listingService.GetListings();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult AddListing(ListingModel listing)
        {
            var toReturn = listingService.AddListing(listing);
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public string DeleteListing(ListingModel listing)
        {
            return listingService.DeleteListing(listing);
        }

        [AllowAnonymous]
        public string UpdateListing(ListingInfo listing)
        {
            return listingService.UpdateListing(listing);
        }

        [AllowAnonymous]
        public JsonResult GetListingsByCurrentUser()
        {
            var toReturn = listingService.GetListingsByCurrentUser(User.Identity.GetUserName());
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }
        
        

        [AllowAnonymous]
        public JsonResult GetUsers()
        {
            var toReturn = iMentorUserService.GetUsers();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetCurrentUser()
        {
            var toReturn = iMentorUserService.GetCurrentUser(User.Identity.GetUserName());
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetUserById(string userId)
        {
            var toReturn = iMentorUserService.GetUserById(userId);
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public string UpdateUser(iMentorUserInfo user)
        {
            return iMentorUserService.UpdateUser(user);
        }

        [AllowAnonymous]
        public JsonResult GetUsersByListing(string data)
        {
            var toReturn = iMentorUserService.GetUsersByListing(data);
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetStudents()
        {
            var toReturn = iMentorUserService.GetStudents();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetMentors()
        {
            var toReturn = iMentorUserService.GetMentors();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public JsonResult GetTeachers()
        {
            var toReturn = iMentorUserService.GetTeachers();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }



        [AllowAnonymous]
        public string AddParticipant(AssignedListing assignment)
        {
            return participantService.AddParticipant(assignment);
        }

        [AllowAnonymous]
        public string RemoveParticipant(AssignedListing assignment)
        {
            return participantService.RemoveParticipant(assignment);
        }
        
        [AllowAnonymous]
        public JsonResult GetAssignments()
        {
            var toReturn = participantService.GetAssignments();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }



        [AllowAnonymous]
        public JsonResult GetApplicants()
        {
            var toReturn = assignmentService.GetApplicants();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
        }

        [AllowAnonymous]
        public string AddApplicant(Applicant applicant)
        {
            return assignmentService.AddApplicant(applicant);
        }

        [AllowAnonymous]
        public string RemoveApplicant(Applicant applicant)
        {
            return assignmentService.RemoveApplicant(applicant);
        }


        [AllowAnonymous]
        public JsonResult GetRoles()
        {
            var toReturn = roleService.GetRoles();
            return Json(toReturn, JsonRequestBehavior.AllowGet);
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