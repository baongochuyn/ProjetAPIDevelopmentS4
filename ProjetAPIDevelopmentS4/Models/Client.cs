using System.Text.Json.Serialization;

namespace ProjetAPIDevelopmentS4.Models
{
    public class Client
    {
        public string? Id { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Address { get; set; }
        public string Email { get; set; }
        public int Tel { get; set; }
        public DateTime Birthday { get; set; }
        public string NbPasseport { get; set; }
    }
}
