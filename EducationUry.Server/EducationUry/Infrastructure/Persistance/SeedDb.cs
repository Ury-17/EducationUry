using System;
using System.IO;
using System.Linq;
using EducationUry.Infrastructure.Persistance.Entities;

namespace EducationUry.Infrastructure.Persistance
{
    public class SeedDb
    {
        public void Load(IDbContext db)
        {
            SeedCategories(db.GetRepository<CategoryEntity>());
            SeedStudents(db.GetRepository<StudentEntity>());
            SeedTeachers(db.GetRepository<TeacherEntity>());
            SeedFiles(db.GetRepository<FileEntity>());
            SeedProjects(db.GetRepository<ProjectEntity>(), db.GetRepository<CategoryEntity>().ToList(x => x.Name == "Без категории").First().Id);
        }

        private void SeedCategories(IRepository<CategoryEntity> categories)
        {
            var data = new[]
            {
                "Без категории",
                "Вторая категория",
                "Третья категория",
            };

            foreach (var s in data)
            {
                categories.Create(new CategoryEntity(s));
            }
        }

        private void SeedFiles(IRepository<FileEntity> files)
        {
            var data = new[]
            {
                Path.Combine("Data", "101 рецепт жульена.pdf"),
                Path.Combine("Data", "Вокруг пушкина за 80 дней.jpg"),
                Path.Combine("Data", "Улица раскрытых преступлений и наказаний.pdf"),
            };

            foreach (var s in data)
            {
                var fileFullName = s.Split(Path.DirectorySeparatorChar).Last();
                var extension = $".{(fileFullName.Split(".").LastOrDefault() ?? string.Empty)}";
                var name = fileFullName.Substring(0, fileFullName.Length - extension.Length);
                files.Create(new FileEntity(name, extension, Path.Combine("Data"), "pdf"));
            }
        }

        private void SeedTeachers(IRepository<TeacherEntity> teachers)
        {
            var data = new[]
            {
                "Исаак Ньютон Петрович",
                "Ра-распутин Григорий Квинович",
                "Себастьян Володя От-так-от",
                "Маскова Илона Генадьевна",
                "Бояршинов Саватей Каперник",
                "Энтони Аганесян Бах",
            };

            foreach (var s in data)
            {
                teachers.Create(new TeacherEntity(s));
            }
        }

        private void SeedStudents(IRepository<StudentEntity> students)
        {
            var data = new[]
            {
                "Пинчук Анастасия Игоревна",
                "Агата Моисеева Тиховна",
                "Мартынов Станислав Владимирович"
            };

            foreach (var s in data)
            {
                students.Create(new StudentEntity(s));
            }
        }

        private void SeedProjects(IRepository<ProjectEntity> projects, Guid defaultCategoryId)
        {
            for (var i = 0; i < 50; i++)
            {
                projects.Create(new ProjectEntity($"Project-{i}", $"Desc-{i}", defaultCategoryId));
            }
        }
    }
}