namespace EducationUry.Infrastructure.Persistance.Entities
{
    public class StudentEntity : Entity
    {
        public string Name { get; set; }
        public StudentEntity(string name)
        {
            Name = name;
        }
    }
}