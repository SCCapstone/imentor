using iMentor.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace iMentor.BL
{
    public class AssignmentServiceMstr
    {
        [AllowAnonymous]
        public List<Applicant> GetApplicants()
        {
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                return db.Applicants.ToList();
            }
        }

        [AllowAnonymous]
        public string AddApplicant(Applicant applicant)
        {
            if (applicant != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    db.Applicants.Add(applicant);
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
        public string RemoveApplicant(Applicant applicant)
        {
            if (applicant != null)
            {
                using (iMAST_dbEntities db = new iMAST_dbEntities())
                {
                    var a = db.Applicants.Where(x => x.UserId == applicant.UserId && x.ListingId == applicant.ListingId).FirstOrDefault();

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
    }
}
