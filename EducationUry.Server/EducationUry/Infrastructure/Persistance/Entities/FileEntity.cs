namespace EducationUry.Infrastructure.Persistance.Entities
{
    public class FileEntity : Entity
    {
        public string Name { get; }
        public string Extension { get; }
        public string Path { get; }
        public string ContentType { get; }

        public FileEntity(string name, string extension, string path, string contentType)
        {
            Name = name;
            Extension = extension;
            Path = path;
            ContentType = contentType;
        }

        public string FullName => $"{Name}{Extension}";
        public string FullPath => System.IO.Path.Combine(Path, $"{Id}{Extension}");
    }
}