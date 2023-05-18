namespace EducationUry.Infrastructure.Persistance
{
    public interface IDbContext
    {
        public IRepository<T> GetRepository<T>() where T : Entity;
        public void RemoveRepository<T>() where T : Entity;
        public bool IsExistRepository<T>() where T : Entity;
    }
}