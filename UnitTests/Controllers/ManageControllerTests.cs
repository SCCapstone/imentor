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
            listing.HangoutUrl  = "what.com";
            listing.TeacherId   = 5;
            listing.Open        = false;

            //Testing the AddListing function
            controller.AddListing(listing);

            //Check that the listing was actually added to the database
            ListingModel lastAdded = controller.ReturnLastAddedListing();

            Assert.IsTrue( listing.Title       == lastAdded.Title          &&
                           listing.StartDate   == lastAdded.StartDate      &&
                           listing.EndDate     == lastAdded.EndDate        &&
                           listing.Area        == lastAdded.Area           &&
                           listing.Frequency   == lastAdded.Frequency      &&
                           listing.Description == lastAdded.Description    &&
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

            listing.Id          = listingModel.Id;
            listing.Title       = "Unit Test (Updated)";
            listing.StartDate   = listingModel.StartDate;
            listing.EndDate     = listingModel.EndDate;
            listing.Area        = listingModel.Area;
            listing.Frequency   = listingModel.Frequency;
            listing.Description = "Unit testing... again!";
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
                           listing.HangoutUrl   == lastAdded.HangoutUrl     &&
                           listing.TeacherId    == lastAdded.TeacherId      &&
                           listing.Open         == lastAdded.Open);
        }

        [TestMethod()]
        public void GetListingsTest()
        {
            ManageController controller = new ManageController();

            var JSONListings = controller.GetListings();

            string stringListings = JsonConvert.SerializeObject(JSONListings.Data);

            List<ListingInfo> ListListings = JsonConvert.DeserializeObject<List<ListingInfo>>(stringListings);

            ListingInfo test = ListListings.Last();

            ListingModel listing = new ListingModel();

            listing.Title       = "Unit Test (Updated)";
            listing.StartDate   = new DateTime(2016, 3, 20, 12, 00, 00);
            listing.EndDate     = new DateTime(2016, 3, 21, 12, 00, 00);
            listing.Area        = "History";
            listing.Frequency   = "Always";
            listing.Description = "Unit testing... again!";
            listing.HangoutUrl  = "what.com";
            listing.TeacherId   = 5;
            listing.Open        = false;

            //Check that all listings were returned by checking for a specific listing
            Assert.IsTrue( listing.Title        == test.Title          &&
                           listing.StartDate    == test.StartDate      &&
                           listing.EndDate      == test.EndDate        &&
                           listing.Area         == test.Area           &&
                           listing.Frequency    == test.Frequency      &&
                           listing.Description  == test.Description    &&
                           listing.HangoutUrl   == test.HangoutUrl     &&
                           listing.TeacherId    == test.TeacherId      &&
                           listing.Open         == test.Open);
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

            Assert.IsFalse( listing.Title        == lastAdded.Title          &&
                            listing.StartDate    == lastAdded.StartDate      &&
                            listing.EndDate      == lastAdded.EndDate        &&
                            listing.Area         == lastAdded.Area           &&
                            listing.Frequency    == lastAdded.Frequency      &&
                            listing.Description  == lastAdded.Description    &&
                            listing.HangoutUrl   == lastAdded.HangoutUrl     &&
                            listing.TeacherId    == lastAdded.TeacherId      &&
                            listing.Open         == lastAdded.Open);
        }

        [TestMethod()]
        public void GetUsersTest()
        {
            ManageController controller = new ManageController();

            var JSONUsers = controller.GetUsers();

            string stringUsers = JsonConvert.SerializeObject(JSONUsers.Data);

            List<iMentorUserInfo> ListUsers = JsonConvert.DeserializeObject<List<iMentorUserInfo>>(stringUsers);

            iMentorUserInfo test = ListUsers.First();

            iMentorUserInfo user = new iMentorUserInfo();

            user.UserName   = "8bitminion@gmail.com";
            user.Email      = "8bitminion@gmail.com";

            //Check that all users were returned by checking for a specific user
            Assert.IsTrue( test.UserName   == user.UserName    &&
                           test.Email      == user.Email);
        }

        [TestMethod()]
        public void GetCurrentUserTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void GetUserByIdTest()
        {
            ManageController controller = new ManageController();

            var JSONUser = controller.GetUserById("5");

            string stringUser = JsonConvert.SerializeObject(JSONUser.Data);

            iMentorUserInfo test = JsonConvert.DeserializeObject<iMentorUserInfo>(stringUser);

            iMentorUserInfo user = new iMentorUserInfo();

            user.UserName = "labradoe@gmail.com";
            user.Email = "labradoe@gmail.com";

            Assert.IsTrue( test.UserName    == user.UserName    &&
                           test.Email       == user.Email);
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

            //Check that the user was actually updated in the database
            iMentorUser userUpdated = controller.ReturnLastAddedUser();

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

            //Check that the asp user was actually updated in the database
            AspNetUser userUpdated = controller.ReturnAspUser(user.Email);

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
            ManageController controller = new ManageController();

            var JSONStudents = controller.GetStudents();

            string stringStudents = JsonConvert.SerializeObject(JSONStudents.Data);

            List<iMentorUserInfo> ListStudents = JsonConvert.DeserializeObject<List<iMentorUserInfo>>(stringStudents);

            //This should return the first student created "StudentOne"
            iMentorUserInfo test1 = ListStudents.First();

            Assert.IsTrue(  test1.UserName   == "StudentOne"         &&
                            test1.Email      == "student1@gmail.com" &&
                            test1.RoleId     == 1 );   
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
            ManageController controller = new ManageController();
            AssignedListing test = new AssignedListing();

            test.ListingId  = 1;
            test.UserId     = 5;

            //Check that the AddParticipant function completed successfully
            Assert.AreEqual(controller.AddParticipant(test), "Assignment Added");

            //Check that the assignment was actually added to the database
            AssignedListing lastAdded = controller.ReturnLastAddedAssignment();

            Assert.IsTrue(  lastAdded.ListingId == test.ListingId    &&
                            lastAdded.UserId    == test.UserId);
        }

        [TestMethod()]
        public void GetAssignmentsTest()
        {
            Assert.Fail();
        }

        //*This test has a potential to fail even though it is successful.
        [TestMethod()]
        public void RemoveParticipantTest()
        {
            ManageController controller = new ManageController();

            //Deleting the assignment that was added in previous test
            AssignedListing test = controller.ReturnLastAddedAssignment();

            //Check that the RemoveParticipant function completed successfully
            Assert.AreEqual(controller.RemoveParticipant(test), "Assignment Removed");

            //Check that the assignment was actually deleted from the database
            AssignedListing lastAdded = controller.ReturnLastAddedAssignment();

            //*This assert may fail even though the assignment was removed
            Assert.IsFalse( lastAdded.ListingId == test.ListingId   &&
                            lastAdded.UserId    == test.UserId);
        }

        [TestMethod()]
        public void GetRolesTest()
        {
            Assert.Fail();
        }
    }
}