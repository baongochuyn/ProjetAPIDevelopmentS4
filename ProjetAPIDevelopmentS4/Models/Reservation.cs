using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace ProjetAPIDevelopmentS4.Models
{
    public class Reservation
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public int Id { get; set; }
        [BsonElement("NumeroVol")]
        public int IdVol { get; set; }
        [BsonElement("NumeroClient")]
        public int IdClient { get; set; }
    }
}
