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
using MyToDO.Models;
using System.Web.Http.Cors;

namespace MyToDO.Controllers
{
    [RoutePrefix("api/mytodolist")]
    public class ToDoesController : ApiController
    {
        private TODOAppEntitities db = new TODOAppEntitities();
        [Route("get")]
        // GET: api/ToDoes
        [HttpGet]
        public IQueryable<ToDo> GetToDos()
        {
            return db.ToDos;
        }

        // GET: api/ToDoes/5
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult GetToDo(int id)
        {
            ToDo toDo = db.ToDos.Find(id);
            if (toDo == null)
            {
                return NotFound();
            }

            return Ok(toDo);
        }

        // PUT: api/ToDoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutToDo(int id, ToDo toDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != toDo.ToDo_ID)
            {
                return BadRequest();
            }

            db.Entry(toDo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToDoExists(id))
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

        [Route("post")]
        // POST: api/ToDoes
        [HttpPost]
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult PostToDo([FromBody]ToDo toDo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.ToDos.Add(toDo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = toDo.ToDo_ID }, toDo);
            //return Ok();
        }

        // DELETE: api/ToDoes/5
        [ResponseType(typeof(ToDo))]
        public IHttpActionResult DeleteToDo(int id)
        {
            ToDo toDo = db.ToDos.Find(id);
            if (toDo == null)
            {
                return NotFound();
            }

            db.ToDos.Remove(toDo);
            db.SaveChanges();

            return Ok(toDo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToDoExists(int id)
        {
            return db.ToDos.Count(e => e.ToDo_ID == id) > 0;
        }
    }
}