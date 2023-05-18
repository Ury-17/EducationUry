using System;
using System.Linq;
using EducationUry.Infrastructure;
using EducationUry.Infrastructure.Common;
using EducationUry.Infrastructure.Persistance;
using EducationUry.Infrastructure.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Controllers
{
    public class StudentsController : DbController
    {
        [HttpGet]
        [Route("list")]
        public IActionResult List()
        {
            var entities = Db.GetRepository<StudentEntity>()
                .All()
                .Select(x => new StudentModel(x.Id, x.Name))
                .ToArray();

            return Ok(ApiResponse<object>.Success(new
            {
                students = entities
            }));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(Guid id)
        {
            var entity = Db.GetRepository<StudentEntity>().GetById(id);

            if (entity == null)
                return NotFound(ApiResponse<object>.Failure($"Not found student with id: {id}"));

            entity.IsDelete = true;
            Db.GetRepository<StudentEntity>().Update(entity);

            return Ok(ApiResponse<object>.Success());
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] StudentModel request)
        {
            var student = Db.GetRepository<StudentEntity>().Create(new StudentEntity(request.Name));

            return Ok(ApiResponse<object>.Success(new
            {
                id = student
            }));
        }

        [HttpPost]
        [Route("update")]
        public IActionResult Update([FromBody] StudentModel model)
        {
            var entity = Db.GetRepository<StudentEntity>().GetById(model.Id);

            if (entity == null)
            {
                entity = new StudentEntity(model.Name);
                Db.GetRepository<StudentEntity>().Create(entity);
            }

            entity.Name = model.Name;

            Db.GetRepository<StudentEntity>().Update(entity);

            return Ok(ApiResponse<object>.Success());
        }

        public StudentsController(IDbContext db) : base(db) { }
    }
}