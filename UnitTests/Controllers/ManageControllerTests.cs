using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Diagnostics;
using iMentor.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iMentor.Models;
using iMentor.Entities;
using System.Windows.Forms;
using Newtonsoft.Json;

//Please run all tests for clean-up purposes.
namespace iMentor.Controllers.Tests
{
    [TestClass()]
    public class ManageControllerTests
    {

        [TestMethod()]
        public void AddListingTest()
        {
            ManageController controller = new ManageController();
            ListingModel listing = new ListingModel();

            listing.Title       = "Unit Test";
            listing.StartDate   = new DateTime(2016, 3, 20, 12, 00, 00);
            listing.EndDate     = new DateTime(2016, 3, 21, 12, 00, 00);
            listing.Area        = "History";
            listing.Frequency   = "Always";
            listing.Description = "Unit testing!";
            listing.Mentor      = "Ryan";
            listing.Email       = "labradoe@gmail.com";
            listing.HangoutUrl  = "what.com";
            listing.TeacherId   = 5;
            listing.Open        = false;

            //Check that the AddListing function completed successfully
            Assert.AreEqual(controller.AddListing(listing),"Listing Added");

            //Check that the listing was actually added to the database
            ListingModel lastAdded = controller.ReturnLastAddedListing();

            Assert.IsTrue( listing.Title       == lastAdded.Title          &&
                           listing.StartDate   == lastAdded.StartDate      &&
                           listing.EndDate     == lastAdded.EndDate        &&
                           listing.Area        == lastAdded.Area           &&
                           listing.Frequency   == lastAdded.Frequency      &&
                           listing.Description == lastAdded.Description    &&
                           listing.Mentor      == lastAdded.Mentor         &&
                           listing.Email       == lastAdded.Email          &&
                           listing.HangoutUrl  == lastAdded.HangoutUrl     &&
                           listing.TeacherId   == lastAdded.TeacherId      &&
                           listing.Open        == lastAdded.Open );            

        }

        [TestMethod()]
        public void UpdateListingTest()
        {
            ManageController controller = new ManageController();
            ListingModel listingModel = controller.ReturnLastAddedListing();
            ListingInfo listing = new ListingInfo();

            listing.ID          = listingModel.ID;
            listing.Title       = "Unit Test (Updated)";
            listing.StartDate   = listingModel.StartDate;
            listing.EndDate     = listingModel.EndDate;
            listing.Area        = listingModel.Area;
            listing.Frequency   = listingModel.Frequency;
            listing.Description = "Unit testing... again!";
            listing.Mentor      = listingModel.Mentor;
            listing.Email       = listingModel.Email;
            listing.HangoutUrl  = listingModel.HangoutUrl;
            listing.TeacherId   = listingModel.TeacherId;
            listing.Open        = listingModel.Open;
            listing.Teacher     = "labradoe@gmail.com";

            //Check that the UpdateListing function completed successfully
            Assert.AreEqual(controller.UpdateListing(listing), "Listing Updated");

            //Check that the listing was actually updated in the database
            ListingModel lastAdded = controller.ReturnLastAddedListing();

            Assert.IsTrue( listing.Title        == lastAdded.Title          &&
                           listing.StartDate    == lastAdded.StartDate      &&
                           listing.EndDate      == lastAdded.EndDate        &&
                           listing.Area         == lastAdded.Area           &&
                           listing.Frequency    == lastAdded.Frequency      &&
                           listing.Description  == lastAdded.Description    &&
                           listing.Mentor       == lastAdded.Mentor         &&
                           listing.Email        == lastAdded.Email          &&
                           listing.HangoutUrl   == lastAdded.HangoutUrl     &&
                           listing.TeacherId    == lastAdded.TeacherId      &&
                           listing.Open         == lastAdded.Open);
        }

        [TestMethod()]
        public void GetListingsTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void DeleteListingTest()
        {
            ManageController controller = new ManageController();

            //Deleting the listing added in the previous test
            ListingModel listing = controller.ReturnLastAddedListing();

            //Check that the DeleteListing function completed successfully
            Assert.AreEqual(controller.DeleteListing(listing),"Listing Deleted");

            //Check that the listing was actually deleted from the database
            ListingModel lastAdded = controller.ReturnLastAddedListing();

            Assert.IsFalse(listing.Title        == lastAdded.Title          &&
                           listing.StartDate    == lastAdded.StartDate      &&
                           listing.EndDate      == lastAdded.EndDate        &&
                           listing.Area         == lastAdded.Area           &&
                           listing.Frequency    == lastAdded.Frequency      &&
                           listing.Description  == lastAdded.Description    &&
                           listing.Mentor       == lastAdded.Mentor         &&
                           listing.Email        == lastAdded.Email          &&
                           listing.HangoutUrl   == lastAdded.HangoutUrl     &&
                           listing.TeacherId    == lastAdded.TeacherId      &&
                           listing.Open         == lastAdded.Open);

        }

        [TestMethod()]
        public void GetUsersTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetCurrentUserTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetUserByIdTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void UpdateUserTest()
        {
            ManageController controller = new ManageController();
            iMentorUser user = controller.ReturnLastAddedUser();
            iMentorUserInfo userInfo = new iMentorUserInfo();

            userInfo.Id         = user.Id;
            userInfo.UserName   = "Unit testing was here";
            userInfo.Email      = user.Email;
            userInfo.RoleId     = user.RoleId;
            userInfo.Role       = userInfo.GetRoleByUser(user);

            //Check that the UpdateUser function completed successfully
            Assert.AreEqual(controller.UpdateUser(userInfo), "User Updated");

            iMentorUser userUpdated = controller.ReturnLastAddedUser();

            //Check that the user was updated in the database
            Assert.IsTrue(  userUpdated.Id         == userInfo.Id          &&
                            userUpdated.UserName   == userInfo.UserName    &&
                            userUpdated.Email      == userInfo.Email       &&
                            userUpdated.RoleId     == userInfo.RoleId);

            //Clean up
            userInfo.UserName   = user.UserName;
            controller.UpdateUser(userInfo);

        }

        [TestMethod()]
        public void UpdateAspUserTest()
        {
            ManageController controller = new ManageController();
            iMentorUser user = controller.ReturnLastAddedUser();
            iMentorUserInfo userInfo = new iMentorUserInfo();

            userInfo.UserName = "Unit testing was here";
            userInfo.Email = user.Email;

            //Check that the UpdateAspUser function completed successfully
            Assert.AreEqual(controller.UpdateAspUser(userInfo), "Asp User Updated");

            AspNetUser userUpdated = controller.ReturnAspUser(user.Email);

            //Check that the asp user was updated in the database
            Assert.IsTrue(  userUpdated.UserName    == userInfo.UserName    &&
                            userUpdated.Email       == userInfo.Email);

            //Clean up
            userInfo.UserName = user.UserName;
            controller.UpdateAspUser(userInfo);

        }

        [TestMethod()]
        public void GetUsersByListingTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetStudentsTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetMentorsTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetTeachersTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetAllUsersTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void AddParticipantTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void RemoveParticipantTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetAssignmentsTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetRolesTest()
        {
            Assert.Fail();
        }
    }
}