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
    public class iMentorUsersController : ApiController
    {
        private iMAST_dbEntities db = new iMAST_dbEntities();

        // GET: api/iMentorUsers
        public IQueryable<iMentorUser> GetiMentorUsers()
        {
            return db.iMentorUsers;
        }

        // GET: api/iMentorUsers/5
        [ResponseType(typeof(iMentorUser))]
        public IHttpActionResult GetiMentorUser(int id)
        {
            iMentorUser iMentorUser = db.iMentorUsers.Find(id);
            if (iMentorUser == null)
            {
                return NotFound();
            }

            return Ok(iMentorUser);
        }

        // PUT: api/iMentorUsers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutiMentorUser(int id, iMentorUser iMentorUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != iMentorUser.Id)
            {
                return BadRequest();
            }

            db.Entry(iMentorUser).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!iMentorUserExists(id))
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

        // POST: api/iMentorUsers
        [ResponseType(typeof(iMentorUser))]
        public IHttpActionResult PostiMentorUser(iMentorUser iMentorUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.iMentorUsers.Add(iMentorUser);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = iMentorUser.Id }, iMentorUser);
        }

        // DELETE: api/iMentorUsers/5
        [ResponseType(typeof(iMentorUser))]
        public IHttpActionResult DeleteiMentorUser(int id)
        {
            iMentorUser iMentorUser = db.iMentorUsers.Find(id);
            if (iMentorUser == null)
            {
                return NotFound();
            }

            db.iMentorUsers.Remove(iMentorUser);
            db.SaveChanges();

            return Ok(iMentorUser);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool iMentorUserExists(int id)
        {
            return db.iMentorUsers.Count(e => e.Id == id) > 0;
        }
    }
}