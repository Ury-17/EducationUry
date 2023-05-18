using System;
using System.Collections.Generic;

namespace EducationUry.Infrastructure.Persistance.Entities
{
    public class ProjectEntity : Entity
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IReadOnlyCollection<Guid> StudentIds { get; set; }
        public IReadOnlyCollection<Guid> AuthorIds { get; set; }
        public IReadOnlyCollection<Guid> FileIds { get; set; }
        public Guid CategoryId { get; set; }
        public bool Archive { get; set; }

        public ProjectEntity(string name, string description, Guid categoryId)
        {
            Name = name;
            Description = description;
            StudentIds = Array.Empty<Guid>();
            AuthorIds = Array.Empty<Guid>();
            FileIds = Array.Empty<Guid>();
            CategoryId = categoryId;
            Archive = false;
        }
    }
}