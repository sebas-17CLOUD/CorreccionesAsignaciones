using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ToDoExamen.Models
{
    [BsonIgnoreExtraElements]
    public class TodoModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("titulo")]
        public string Titulo { get; set; } = string.Empty;

        [BsonElement("descripcion")]
        public string Descripcion { get; set; } = string.Empty;

        [BsonElement("completada")]
        public bool Completada { get; set; }

        [BsonElement("fechaCreacion")]
        public DateTime FechaCreacion { get; set; }

        [BsonElement("prioridad")]
        public string Prioridad { get; set; } = string.Empty;
    }
}