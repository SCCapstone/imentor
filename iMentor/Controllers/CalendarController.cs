﻿using System.Linq;
using iMentor.Models;
using System.Web.Mvc;
using iMentor.Entities;
using Microsoft.AspNet.Identity;
using System;

namespace iMentor.Controllers
{
    [RequireHttps]
    [RoutePrefix("api/calendar")]
    public class CalendarController : Controller
    {
        private iMAST_dbEntities db = new iMAST_dbEntities();


        [AllowAnonymous]
        public JsonResult GetListingsByCurrentUser()
        {
            var currentUserName = User.Identity.GetUserName(); //Get current User's username
            var result = db.ListingModels.Where(x => x.Mentor.Equals(currentUserName)).ToList();
            
            return Json(result, JsonRequestBehavior.AllowGet);
        }
    }
}