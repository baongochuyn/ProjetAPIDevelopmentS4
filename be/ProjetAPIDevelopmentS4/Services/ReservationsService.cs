using ProjetAPIDevelopmentS4.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ProjetAPIDevelopmentS4.Services
{
    public class ReservationsService
    {
        private readonly IMongoCollection<Reservation> _reservationsCollection;

        public ReservationsService(
        IOptions<AirportDatabaseSetting> airportDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                airportDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                airportDatabaseSetting.Value.DatabaseName);


            _reservationsCollection = mongoDatabase.GetCollection<Reservation>("Reservations");
        }
        public async Task<List<Reservation>> GetReservationAsync() =>
        await _reservationsCollection.Find(_ => true).ToListAsync();

        public async Task<Reservation?> GetReservationAsync(string id) =>
        await _reservationsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateReservationAsync(Reservation newVol) =>
        await _reservationsCollection.InsertOneAsync(newVol);

        public async Task UpdateReservationAsync(string id, Reservation updatedVol) =>
        await _reservationsCollection.ReplaceOneAsync(x => x.Id == id, updatedVol);

        public async Task RemoveReservationAsync(string id) =>
            await _reservationsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
