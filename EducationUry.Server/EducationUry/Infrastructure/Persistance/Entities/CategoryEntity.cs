using System;

namespace EducationUry.Infrastructure.Persistance.Entities
{
    public class CategoryEntity : Entity
    {
        public string Name { get; set; }
        public CategoryEntity(string name)
        {
            Name = name;
        }
    }
}