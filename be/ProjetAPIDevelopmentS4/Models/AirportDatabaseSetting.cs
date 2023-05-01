namespace ProjetAPIDevelopmentS4.Models
{
    public class AirportDatabaseSetting
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public List<string> AirportCollectionName { get; set; } = null!;
    }
}
