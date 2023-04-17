namespace ProjetAPIDevelopmentS4.Models
{
    public class Vol
    {
        public int IdVol { get; set; } 
        public string VilleDepart { get; set; } 
        public string VilleArrivee { get; set; } 
        public DateTime HeureDepart { get; set; } 
        public DateTime HeureArrivee { get; set; } 
        public string IdentifiantAvion { get; set; } 
        public int NombreDePlaces { get; set; }
    }
}
