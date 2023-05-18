using System;
using System.Linq;
using EducationUry.Infrastructure;
using EducationUry.Infrastructure.Common;
using EducationUry.Infrastructure.Persistance;
using EducationUry.Infrastructure.Persistance.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Controllers
{
    public class CategoriesController : DbController
    {
        [HttpGet]
        [Route("list")]
        public IActionResult List()
        {
            var entities = Db.GetRepository<CategoryEntity>()
                .All()
                .Select(x => new CategoryModel(x.Id, x.Name))
                .ToArray();

            return Ok(ApiResponse<object>.Success(new
            {
                Categories = entities
            }));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(Guid id)
        {
            var entity = Db.GetRepository<CategoryEntity>().GetById(id);

            if (entity == null)
                return NotFound(ApiResponse<object>.Failure($"Not found Category with id: {id}"));

            entity.IsDelete = true;
            Db.GetRepository<CategoryEntity>().Update(entity);

            return Ok(ApiResponse<object>.Success());
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] CategoryModel request)
        {
            var Category = Db.GetRepository<CategoryEntity>().Create(new CategoryEntity(request.Name));

            return Ok(ApiResponse<object>.Success(new
            {
                id = Category
            }));
        }

        [HttpPost]
        [Route("update")]
        public IActionResult Update([FromBody] CategoryModel model)
        {
            var entity = Db.GetRepository<CategoryEntity>().GetById(model.Id);

            if (entity == null)
            {
                entity = new CategoryEntity(model.Name);
                Db.GetRepository<CategoryEntity>().Create(entity);
            }

            entity.Name = model.Name;

            Db.GetRepository<CategoryEntity>().Update(entity);

            return Ok(ApiResponse<object>.Success());
        }

        public CategoriesController(IDbContext db) : base(db) { }
    }

    public class CategoryModel
    {
        public Guid Id { get; }
        public string Name { get; }

        public CategoryModel(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
    }
}