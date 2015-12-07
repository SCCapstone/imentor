using iMentor.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;

namespace iMentor.Controllers
{
    [RequireHttps]
    public class HomeController : Controller
    {
        private MAST2015_dbEntities db = new MAST2015_dbEntities();

        [AllowAnonymous]
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Secure()
        {
            ViewBag.Message = "Secure page.";
            return View();
        }

        public ActionResult ShowUserRoles()
        {
            string[] roleNames = Roles.GetRolesForUser();
            return View(roleNames);
        }

        //Testing SQL -> AngularJS code
        [AllowAnonymous]
        public string GetUser()
        {
             AspNetUser tempUser = db.AspNetUsers.FirstOrDefault();
             return tempUser.UserName;
        }
    }
}