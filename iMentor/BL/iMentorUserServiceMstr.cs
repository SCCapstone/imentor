using iMentor.Models;
using iMentor.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace iMentor.BL
{
    public class iMentorUserServiceMstr
    {
        [AllowAnonymous]
        [HttpGet]
        public List<iMentorUserInfo> GetUsers()
        {
            return GetAllUsers();
        }

        [AllowAnonymous]
        [HttpGet]
        public iMentorUserInfo GetCurrentUser(string userName)
        {
            var currentUserName = userName;
            var user = new iMentorUserInfo();

            if (!currentUserName.Equals(""))
            {
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

            return user;
        }

        [AllowAnonymous]
        [HttpGet]
        public iMentorUser GetUserById(string userId)
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                var id = Convert.ToInt32(userId);
               return db.iMentorUsers.Where(x => x.Id == id).FirstOrDefault();
            }
        }

        [AllowAnonymous]
        [HttpPost]
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
        [HttpPost]
        public string UpdateAspUser(iMentorUserInfo user)
        {
            if (user != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var aspUser = db.AspNetUsers.Where(x => x.Email.Equals(user.Email)).FirstOrDefault();

                    if (aspUser != null)
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
        [HttpGet]
        public List<iMentorUserInfo> GetUsersByListing(string data)
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

                return users;
            }
        }

        [AllowAnonymous]
        [HttpGet]
        public List<iMentorUserInfo> GetStudents()
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

            return students;
        }

        [AllowAnonymous]
        [HttpGet]
        public List<iMentorUserInfo> GetMentors()
        {
            List<iMentorUserInfo> allUsers = GetAllUsers();
            List<iMentorUserInfo> mentors = new List<iMentorUserInfo>();

            foreach (iMentorUserInfo user in allUsers)
            {
                if (user.RoleId == 2)
                {
                    mentors.Add(user);
                }
            }

            return mentors;
        }

        [AllowAnonymous]
        [HttpGet]
        public List<iMentorUserInfo> GetTeachers()
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

            return teachers;
        }

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
    }
}
