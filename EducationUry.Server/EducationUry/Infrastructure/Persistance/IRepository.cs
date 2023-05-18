#nullable enable
using System;
using System.Collections.Generic;

namespace EducationUry.Infrastructure.Persistance
{
    public abstract class Entity
    {
        public Guid Id { get; internal set; }
        public DateTime CreatedDateTime { get; internal set; }
        public DateTime UpdatedDateTime { get; internal set; }
        public bool IsDelete { get; internal set; }
    }

    public interface IRepository<T> where T : Entity
    {
        public Guid Create(T entity);
        public T? GetById(Guid id);
        public IEnumerable<T> GetByIds(Guid[] ids);
        public IEnumerable<T> ToList(Func<T, bool> condition);
        public IEnumerable<T> All();
        public void Delete(Guid id);
        public bool IsExistById(Guid id);
        public void Update(T entity);
    }
}