using ProjetAPIDevelopmentS4.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ProjetAPIDevelopmentS4.Services
{
    public class VolsService
    {
        private readonly IMongoCollection<Vol> _volsCollection;

        public VolsService(
        IOptions<AirportDatabaseSetting> airportDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                airportDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                airportDatabaseSetting.Value.DatabaseName);


            _volsCollection = mongoDatabase.GetCollection<Vol>("Vols");
        }
        public async Task<List<Vol>> GetVolAsync() =>
        await _volsCollection.Find(_ => true).ToListAsync();

        public async Task<Vol?> GetVolAsync(string id) =>
        await _volsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateVolAsync(Vol newVol) =>
        await _volsCollection.InsertOneAsync(newVol);

        public async Task UpdateVolAsync(string id, Vol updatedVol) =>
        await _volsCollection.ReplaceOneAsync(x => x.Id == id, updatedVol);

        public async Task RemoveVolAsync(string id) =>
            await _volsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
