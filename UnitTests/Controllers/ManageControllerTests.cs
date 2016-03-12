using Microsoft.VisualStudio.TestTools.UnitTesting;
using iMentor.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iMentor.Models;
using iMentor.Entities;

namespace iMentor.Controllers.Tests
{
    [TestClass()]
    public class ManageControllerTests
    {
        [TestMethod()]
        public void GetListingsTest()
        {
            ManageController controller = new ManageController();
            Assert.IsNull(controller.GetListings());


        }

        [TestMethod()]
        public void AddListingTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void DeleteListingTest()
        {
            Assert.Fail();
        }

        [TestMethod()]
        public void UpdateListingTest()
        {
            Assert.Fail();
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
            Assert.Fail();
        }

        [TestMethod()]
        public void UpdateAspUserTest()
        {
            Assert.Fail();
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