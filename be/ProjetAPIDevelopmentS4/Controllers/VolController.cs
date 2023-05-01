using ProjetAPIDevelopmentS4.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetAPIDevelopmentS4.Models;
using ProjetAPIDevelopmentS4.Services;

namespace ProjetAPIDevelopmentS4.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]

    public class VolController : Controller
    {
        private readonly VolsService _volsService;

        public VolController(VolsService volsService) =>
            _volsService = volsService;

        // GET: VolController
        [HttpGet]
        public async Task<List<Vol>> Get() =>
        await _volsService.GetVolAsync();

        // GET: VolController/id
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Vol>> Get(string id)
        {
            var vol = await _volsService.GetVolAsync(id);

            if (vol is null)
            {
                return NotFound();
            }

            return vol;
        }

        // POST: VolController/Create
        [HttpPost]
        public async Task<IActionResult> Post(Vol newVol)
        {
            await _volsService.CreateVolAsync(newVol);

            return CreatedAtAction(nameof(Get), new { id = newVol.Id }, newVol);
        }

        // POST: VolController/Edit/5
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Vol updatedVol)
        {
            var vol = await _volsService.GetVolAsync(id);

            if (vol is null)
            {
                return NotFound();
            }

            updatedVol.Id = vol.Id;

            await _volsService.UpdateVolAsync(id, updatedVol);

            return NoContent();
        }


        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var vol = await _volsService.GetVolAsync(id);

            if (vol is null)
            {
                return NotFound();
            }

            await _volsService.RemoveVolAsync(id);

            return NoContent();
        }
    }
}
