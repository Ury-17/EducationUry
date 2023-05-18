using System;
using System.Linq;
using EducationUry.Extensions;
using EducationUry.Infrastructure;
using EducationUry.Infrastructure.Common;
using EducationUry.Infrastructure.Persistance;
using EducationUry.Infrastructure.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Controllers
{
    public class TeachersController : DbController
    {
        [HttpGet]
        [Route("list")]
        public IActionResult List()
        {
            var teachers = Db.GetRepository<TeacherEntity>()
                .All()
                .Select(x => new TeacherModel(x.Id, x.Name))
                .ToArray();

            return Ok(ApiResponse<object>.Success(new
            {
                teachers = teachers
            }));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(Guid id)
        {
            var teacher = Db.GetRepository<TeacherEntity>().GetById(id);

            if (teacher == null)
                return NotFound(ApiResponse<object>.Failure($"Not found teacher with id: {id}"));

            teacher.IsDelete = true;
            Db.GetRepository<TeacherEntity>().Update(teacher);

            return Ok(ApiResponse<object>.Success());
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] TeacherModel request)
        {
            var teacher = Db.GetRepository<TeacherEntity>().Create(new TeacherEntity(request.Name));

            return Ok(ApiResponse<object>.Success(new
            {
                id = teacher
            }));
        }

        [HttpPost]
        [Route("update")]
        public IActionResult Update([FromBody] TeacherModel model)
        {
            var entity = Db.GetRepository<TeacherEntity>().GetById(model.Id);

            if (entity == null)
            {
                entity = new TeacherEntity(model.Name);
                Db.GetRepository<TeacherEntity>().Create(entity);
            }

            entity.Name = model.Name;

            Db.GetRepository<TeacherEntity>().Update(entity);

            return Ok(ApiResponse<object>.Success());
        }

        public TeachersController(IDbContext db) : base(db) { }
    }

    public class TeacherModel
    {
        public Guid Id { get; }
        public string Name { get; }

        public TeacherModel(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}