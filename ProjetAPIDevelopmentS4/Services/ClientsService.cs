using ProjetAPIDevelopmentS4.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace ProjetAPIDevelopmentS4.Services
{
    public class ClientsService
    {
        private readonly IMongoCollection<Client> _clientsCollection;

        public ClientsService(
        IOptions<AirportDatabaseSetting> airportDatabaseSetting)
        {
            var mongoClient = new MongoClient(
                airportDatabaseSetting.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                airportDatabaseSetting.Value.DatabaseName);


            _clientsCollection = mongoDatabase.GetCollection<Client>("Clients");
        }
        public async Task<List<Client>> GetClientAsync() =>
        await _clientsCollection.Find(_ => true).ToListAsync();
         
        public async Task<Client?> GetClientAsync(string id) =>
        await _clientsCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateClientAsync(Client newClient) =>
        await _clientsCollection.InsertOneAsync(newClient);

        public async Task UpdateClientAsync(string id, Client updatedClient) =>
        await _clientsCollection.ReplaceOneAsync(x => x.Id == id, updatedClient);

        public async Task RemoveClientAsync(string id) =>
            await _clientsCollection.DeleteOneAsync(x => x.Id == id);
    }
}
