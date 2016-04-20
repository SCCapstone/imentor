using iMentor.Entities;
using iMentor.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace iMentor.BL
{
    public class ListingServiceMstr
    {
        [AllowAnonymous]
        public List<ListingInfo> GetListings()
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

                return listings;
            }
        }

        [AllowAnonymous]
        public ListingModel AddListing(ListingModel listing)
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
                        return listing;
                    }
                    catch (Exception err)
                    {
                        return null;
                    }
                }
            }
            else
            {
                return null;
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
        public List<ListingInfo> GetListingsByCurrentUser(string userName)
        {
            var currentUserName = userName;
            List<ListingInfo> listings = new List<ListingInfo>();
            var userInDatabase = false;

            //Check if the current user is in the database
            using (iMAST_dbEntities db = new iMAST_dbEntities())
            {
                userInDatabase = db.iMentorUsers.Where(x => x.UserName.Equals(currentUserName)).FirstOrDefault() != null;
            }

            if (userInDatabase)
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

            return listings;
        }


        #region Helper Methods

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
                    DateTime expireTime = hangoutStart.AddHours(hourDiff);
                    expireTime = expireTime.AddMinutes(minuteDiff);

                    if (currentDate > expireTime)
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
    }
}
