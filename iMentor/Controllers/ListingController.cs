using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using iMentor.Models;

namespace iMentor.Controllers
{
    public class ListingController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Listing
        public IQueryable<ListingModel> GetListingModels()
        {
            return db.ListingModels;
        }

        // GET: api/Listing/5
        [ResponseType(typeof(ListingModel))]
        public IHttpActionResult GetListingModel(int id)
        {
            ListingModel listingModel = db.ListingModels.Find(id);
            if (listingModel == null)
            {
                return NotFound();
            }

            return Ok(listingModel);
        }

        // PUT: api/Listing/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutListingModel(int id, ListingModel listingModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != listingModel.ID)
            {
                return BadRequest();
            }

            db.Entry(listingModel).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ListingModelExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Listing
        [ResponseType(typeof(ListingModel))]
        public IHttpActionResult PostListingModel(ListingModel listingModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ListingModels.Add(listingModel);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = listingModel.ID }, listingModel);
        }

        // DELETE: api/Listing/5
        [ResponseType(typeof(ListingModel))]
        public IHttpActionResult DeleteListingModel(int id)
        {
            ListingModel listingModel = db.ListingModels.Find(id);
            if (listingModel == null)
            {
                return NotFound();
            }

            db.ListingModels.Remove(listingModel);
            db.SaveChanges();

            return Ok(listingModel);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ListingModelExists(int id)
        {
            return db.ListingModels.Count(e => e.ID == id) > 0;
        }
    }
}