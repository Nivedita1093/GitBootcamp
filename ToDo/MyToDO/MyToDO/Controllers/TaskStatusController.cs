﻿using System;
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
    [RoutePrefix("api/mytaskstatus")]
    public class TaskStatusController : ApiController
    {
        private TODOAppEntitities db = new TODOAppEntitities();

        [Route("get")]
        // GET: api/TaskStatus
        [HttpGet]
        public IQueryable<TaskStatu> GetTaskStatus()
        {
            return db.TaskStatus;
        }

        // GET: api/TaskStatus/5
        [ResponseType(typeof(TaskStatu))]
        public IHttpActionResult GetTaskStatu(int id)
        {
            TaskStatu taskStatu = db.TaskStatus.Find(id);
            if (taskStatu == null)
            {
                return NotFound();
            }

            return Ok(taskStatu);
        }

        // PUT: api/TaskStatus/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTaskStatu(int id, TaskStatu taskStatu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != taskStatu.Task_Status_ID)
            {
                return BadRequest();
            }

            db.Entry(taskStatu).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskStatuExists(id))
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

        // POST: api/TaskStatus
        [ResponseType(typeof(TaskStatu))]
        public IHttpActionResult PostTaskStatu(TaskStatu taskStatu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TaskStatus.Add(taskStatu);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = taskStatu.Task_Status_ID }, taskStatu);
        }

        // DELETE: api/TaskStatus/5
        [ResponseType(typeof(TaskStatu))]
        public IHttpActionResult DeleteTaskStatu(int id)
        {
            TaskStatu taskStatu = db.TaskStatus.Find(id);
            if (taskStatu == null)
            {
                return NotFound();
            }

            db.TaskStatus.Remove(taskStatu);
            db.SaveChanges();

            return Ok(taskStatu);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TaskStatuExists(int id)
        {
            return db.TaskStatus.Count(e => e.Task_Status_ID == id) > 0;
        }
    }
}