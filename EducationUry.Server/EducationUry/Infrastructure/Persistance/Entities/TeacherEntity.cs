namespace EducationUry.Infrastructure.Persistance.Entities
{
    public class TeacherEntity : Entity
    {
        public string Name { get; set; }

        public TeacherEntity(string name)
        {
            Name = name;
        }
    }
}