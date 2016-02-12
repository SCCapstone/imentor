using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using iMentor.Models;

namespace iMentor.Controllers
{
    public class BookingController : Controller
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: Booking
        public ActionResult Index()
        {
            return View(db.ListingModels.ToList());
        }

        // GET: Booking/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ListingModels listingModels = db.ListingModels.Find(id);
            if (listingModels == null)
            {
                return HttpNotFound();
            }
            return View(listingModels);
        }

        // GET: Booking/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Booking/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID,Title,StartDate,EndDate,Area,Frequency,Description,Mentor,Email,URL,Open")] ListingModels listingModels)
        {
            if (ModelState.IsValid)
            {
                db.ListingModels.Add(listingModels);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(listingModels);
        }

        // GET: Booking/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ListingModels listingModels = db.ListingModels.Find(id);
            if (listingModels == null)
            {
                return HttpNotFound();
            }
            return View(listingModels);
        }

        // POST: Booking/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID,Title,StartDate,EndDate,Area,Frequency,Description,Mentor,Email,URL,Open")] ListingModels listingModels)
        {
            if (ModelState.IsValid)
            {
                db.Entry(listingModels).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(listingModels);
        }

        // GET: Booking/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            ListingModels listingModels = db.ListingModels.Find(id);
            if (listingModels == null)
            {
                return HttpNotFound();
            }
            return View(listingModels);
        }

        // POST: Booking/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            ListingModels listingModels = db.ListingModels.Find(id);
            db.ListingModels.Remove(listingModels);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
