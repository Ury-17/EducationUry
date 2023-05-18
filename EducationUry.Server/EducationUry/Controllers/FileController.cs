using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using EducationUry.Infrastructure;
using EducationUry.Infrastructure.Common;
using EducationUry.Infrastructure.Persistance;
using EducationUry.Infrastructure.Persistance.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EducationUry.Controllers
{
    public class FileController : DbController
    {
        public FileController(IDbContext db) : base(db) { }

        [HttpPost]
        [Route("upload")]
        public IActionResult Upload(List<IFormFile> files)
        {
            if (files.Count == 0)
                return BadRequest(ApiResponse<object>.Failure("Not found files in request"));

            var file = files[0];
            if (file.Length <= 0)
                return BadRequest(ApiResponse<object>.Failure("File is empty"));

            if (!Directory.Exists("Data"))
                Directory.CreateDirectory("Data");

            var extensions = $".{file.FileName.Split(".").Last()}";
            var entity = new FileEntity(file.FileName.Substring(0, file.FileName.Length - extensions.Length), extensions, Path.Combine("Data"), file.ContentType);
            using (var fileStream = System.IO.File.Create(entity.FullPath))
            {
                var bytes = Array.Empty<byte>();
                using (var mem = new MemoryStream())
                {
                    file.OpenReadStream().CopyTo(mem);
                    bytes = mem.ToArray();
                }

                fileStream.Write(bytes);
            }

            var id = Db.GetRepository<FileEntity>().Create(entity);
            var newEntity = Db.GetRepository<FileEntity>().GetById(id)!;

            return Ok(ApiResponse<ProjectFileModel>.Success(new ProjectFileModel(newEntity.Id, newEntity.Name, newEntity.Extension)));
        }

        [HttpGet]
        [Route("get/{id}")]
        public IActionResult Get(Guid id)
        {
            var entity = Db.GetRepository<FileEntity>().GetById(id);
            if (entity == null)
                return NotFound();

            if (!System.IO.File.Exists(entity.FullPath))
                return NotFound();

            var bytes = System.IO.File.ReadAllBytes(entity.FullPath);
            return File(bytes, "doc", entity.FullName);
        }
    }
}