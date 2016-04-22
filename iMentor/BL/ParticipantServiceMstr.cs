using iMentor.Entities;
using iMentor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace iMentor.BL
{
    public class ParticipantServiceMstr : Controller
    {

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
        public List<AssignedListing> GetAssignments()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                return db.AssignedListings.ToList();
            }
        }

        [AllowAnonymous]
        public string RemoveUserAssignments(iMentorUserInfo user)
        {
            if (user != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var assignments = db.AssignedListings.Where(x => x.UserId == user.Id).ToList();

                    if (assignments != null || assignments.Count == 0)
                    {
                        foreach(AssignedListing assignment in assignments)
                        {
                            db.AssignedListings.Remove(assignment);
                            db.SaveChanges();
                        }
                        return "Assignment Removed";
                    }
                    else
                    {
                        return "No assignment found";
                    }
                }
            }
            else
            {
                return "Invalid Assignment";
            }
        }
    }
}
