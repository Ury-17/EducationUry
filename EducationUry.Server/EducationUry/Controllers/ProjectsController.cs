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
    public class ProjectsController : DbController
    {
        [HttpGet]
        [Route("list")]
        public IActionResult List(string mode)
        {
            var projects = Db.GetRepository<ProjectEntity>()
                .All()
                .Where(x => mode == "archive" ? x.Archive : !x.Archive)
                .Select(x => new ProjectListModel(x.Id, x.Name, x.Description, x.CreatedDateTime.ToUnixTime()))
                .ToArray();

            return Ok(ApiResponse<object>.Success(new
            {
                projects = projects
            }));
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult Get(Guid id)
        {
            var project = Db.GetRepository<ProjectEntity>().GetById(id);

            if (project == null)
                return NotFound(ApiResponse<Object>.Failure("Не удалось найти проект"));

            var authors = Db.GetRepository<TeacherEntity>().GetByIds(project.AuthorIds.ToArray())
                .Select(x => new ProjectAuthorModel(x.Id, x.Name))
                .ToArray();

            var students = Db.GetRepository<StudentEntity>().GetByIds(project.StudentIds.ToArray())
                .Select(x => new StudentModel(x.Id, x.Name))
                .ToArray();

            var files = Db.GetRepository<FileEntity>().GetByIds(project.FileIds.ToArray())
                .Select(x => new ProjectFileModel(x.Id, x.Name, x.Extension))
                .ToArray();

            var categoryEntity = Db.GetRepository<CategoryEntity>().GetById(project.CategoryId)!;
            var category = new ProjectCategory(categoryEntity.Id, categoryEntity.Name);

            return Ok(ApiResponse<object>.Success(new
                {
                    Project = new ProjectModel(
                        project.Id,
                        project.Name,
                        true,
                        project.Description,
                        project.CreatedDateTime.ToUnixTime(),
                        false,
                        students,
                        authors,
                        files,
                        category),
                    Teachers = Db.GetRepository<TeacherEntity>().All().Select(x => new ProjectAuthorModel(x.Id, x.Name))
                        .ToArray(),
                    Students = Db.GetRepository<StudentEntity>().All().Select(x => new StudentModel(x.Id, x.Name))
                        .ToArray(),
                    Categories = Db.GetRepository<CategoryEntity>().All().Select(x => new ProjectCategory(x.Id, x.Name))
                        .ToArray(),
                }
            ));
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(Guid id)
        {
            var project = Db.GetRepository<ProjectEntity>().GetById(id);

            if (project == null)
                return NotFound(ApiResponse<object>.Failure($"Not found project with id: {id}"));

            project.Archive = true;
            Db.GetRepository<ProjectEntity>().Update(project);

            return Ok(ApiResponse<object>.Success());
        }

        [HttpPost]
        [Route("create")]
        public IActionResult Create([FromBody] CreateProjectRequest request)
        {
            var categoryId = Db.GetRepository<CategoryEntity>().ToList(x => x.Name == "Без категории").First().Id;
            var projectId = Db.GetRepository<ProjectEntity>().Create(new ProjectEntity(request.Name, request.Description, categoryId));

            return Ok(ApiResponse<object>.Success(new
            {
                id = projectId
            }));
        }

        [HttpPost]
        [Route("update")]
        public IActionResult Update([FromBody] ProjectModel model)
        {
            var project = Db.GetRepository<ProjectEntity>().GetById(model.Id);

            if (project == null)
            {
                project = new ProjectEntity(model.Name, model.Description, model.Category.Id);
                Db.GetRepository<ProjectEntity>().Create(project);
            }

            project.Name = model.Name;
            project.Description = model.Description;
            project.StudentIds = model.Students.Select(x => x.Id).ToArray();
            project.AuthorIds = model.Authors.Select(x => x.Id).ToArray();
            project.FileIds = model.Files.Select(x => x.Id).ToArray();
            project.CategoryId = model.Category.Id;

            Db.GetRepository<ProjectEntity>().Update(project);

            return Ok(ApiResponse<object>.Success());
        }

        public ProjectsController(IDbContext db) : base(db) { }
    }

    public class ProjectCategory
    {
        public Guid Id { get; }
        public string Name { get; }

        public ProjectCategory(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
    }

    public class ProjectFileModel
    {
        public Guid Id { get; }
        public string Name { get; }
        public string Extension { get; }

        public ProjectFileModel(Guid id, string name, string extension)
        {
            Id = id;
            Name = name;
            Extension = extension;
        }
    }

    public class StudentModel
    {
        public Guid Id { get; }
        public string Name { get; }

        public StudentModel(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
    }

    public class ProjectAuthorModel
    {
        public Guid Id { get; }
        public string Name { get; }
        public ProjectAuthorModel(Guid id, string name)
        {
            Id = id;
            Name = name;
        }
    }

    public class CreateProjectRequest
    {
        public string Name { get; }
        public string Description { get; }

        public CreateProjectRequest(string name, string description)
        {
            Name = name;
            Description = description;
        }
    }

    public class ProjectModel
    {
        public Guid Id { get; }
        public string Name { get; }
        public bool Enabled { get; }
        public string Description { get; }
        public long Created { get; }
        public bool Archived { get; }
        public StudentModel[] Students { get; }
        public ProjectAuthorModel[] Authors { get; }
        public ProjectFileModel[] Files { get; }
        public ProjectCategory Category { get; }

        public ProjectModel(Guid id, string name, bool enabled, string description, long created, bool archived, StudentModel[] students, ProjectAuthorModel[] authors, ProjectFileModel[] files, ProjectCategory category)
        {
            Id = id;
            Name = name;
            Enabled = enabled;
            Description = description;
            Created = created;
            Archived = archived;
            Students = students;
            Authors = authors;
            Files = files;
            Category = category;
        }
    }

    public class ProjectListModel
    {
        public Guid Id { get; }
        public string Name { get; }
        public string Description { get; }
        public long Created { get; }

        public ProjectListModel(Guid id, string name, string description, long created)
        {
            Id = id;
            Name = name;
            Description = description;
            Created = created;
        }
    }
}