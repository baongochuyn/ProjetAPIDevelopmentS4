using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetAPIDevelopmentS4.Models;
using ProjetAPIDevelopmentS4.Services;

namespace ProjetAPIDevelopmentS4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : Controller
    {
        private readonly ClientsService _clientsService;

        public ClientController(ClientsService clientsService) =>
            _clientsService = clientsService;

        // GET: VolController
        [HttpGet]
        public async Task<List<Client>> Get() =>
        await _clientsService.GetClientAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Client>> Get(string id)
        {
            var client = await _clientsService.GetClientAsync(id);

            if (client is null)
            {
                return NotFound();
            }

            return client;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Client newClient)
        {
            await _clientsService.CreateClientAsync(newClient);

            return CreatedAtAction(nameof(Get), new { id = newClient.Id }, newClient);
        }


        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Client updatedBook)
        {
            var book = await _clientsService.GetClientAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            updatedBook.Id = book.Id;

            await _clientsService.UpdateClientAsync(id, updatedBook);

            return NoContent();
        }

        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var book = await _clientsService.GetClientAsync(id);

            if (book is null)
            {
                return NotFound();
            }

            await _clientsService.RemoveClientAsync(id);

            return NoContent();
        }
    }
}
