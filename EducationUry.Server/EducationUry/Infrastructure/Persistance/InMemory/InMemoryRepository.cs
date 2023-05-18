#nullable enable
using System;
using System.Collections.Generic;
using System.Linq;

namespace EducationUry.Infrastructure.Persistance.InMemory
{
    public class InMemoryRepository<T> : IRepository<T> where T : Entity
    {
        private Dictionary<Guid, Entity> _data;

        public InMemoryRepository()
        {
            _data = new Dictionary<Guid, Entity>();
        }

        public Guid Create(T entity)
        {
            if (IsExistById(entity.Id))
                return Guid.Empty;

            entity.Id = Guid.NewGuid();
            entity.CreatedDateTime = DateTime.Now;
            entity.UpdatedDateTime = DateTime.Now;
            entity.IsDelete = false;

            _data.Add(entity.Id, entity);

            return entity.Id;
        }

        public T? GetById(Guid id)
        {
            if (!IsExistById(id))
                return null;
            if (_data[id].IsDelete)
                return null;

            return (T)_data[id];
        }

        public IEnumerable<T> GetByIds(Guid[] ids)
        {
            return ids.Where(IsExistById).Select(id => GetById(id)!);
        }

        public IEnumerable<T> ToList(Func<T, bool> condition) => _data.Values.Select(x => (T)x).Where(x => !x.IsDelete).Where(condition);
        public IEnumerable<T> All() => _data.Values.Select(x => (T)x).Where(x => !x.IsDelete);

        public void Delete(Guid id)
        {
            if (!IsExistById(id))
                return;

            _data[id].UpdatedDateTime = DateTime.Now;
            _data[id].IsDelete = true;
        }

        public bool IsExistById(Guid id) => _data.ContainsKey(id);

        public void Update(T entity)
        {
            if (!IsExistById(entity.Id))
                return;

            entity.UpdatedDateTime = DateTime.Now;
            _data[entity.Id] = entity;
        }
    }
}