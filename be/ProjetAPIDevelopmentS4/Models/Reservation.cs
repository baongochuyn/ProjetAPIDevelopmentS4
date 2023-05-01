using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace ProjetAPIDevelopmentS4.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        [BsonElement("NumeroVol")]
        public string IdVol { get; set; }
        [BsonElement("NumeroClient")]
        public string IdClient { get; set; }
    }
}
