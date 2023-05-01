using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace ProjetAPIDevelopmentS4.Models
{
    public class Vol
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } 
        public string VilleDepart { get; set; } 
        public string VilleArrivee { get; set; } 
        public DateTime HeureDepart { get; set; } 
        public DateTime HeureArrivee { get; set; } 
        public int IdentifiantAvion { get; set; } 
        public int NombreDePlaces { get; set; }
    }
}
