using System;
using System.Collections.Generic;

namespace EducationUry.Infrastructure.Persistance.InMemory
{
    public class InMemoryDbContext : IDbContext
    {
        private Dictionary<string, object> _repositories;
        public InMemoryDbContext()
        {
            _repositories = new Dictionary<string, object>();
        }

        public IRepository<T> GetRepository<T>() where T : Entity
        {
            var name = GetRepositoryName<T>();
            if (!IsExistRepository<T>())
                _repositories.Add(name, new InMemoryRepository<T>());

            return (IRepository<T>)_repositories[name];
        }

        public void RemoveRepository<T>() where T : Entity
        {
            if (!IsExistRepository<T>())
                return;

            _repositories.Remove(GetRepositoryName<T>());
        }

        public bool IsExistRepository<T>() where T : Entity => _repositories.ContainsKey(GetRepositoryName<T>());

        private string GetRepositoryName<T>() where T : Entity => typeof(T).Name;
    }
}