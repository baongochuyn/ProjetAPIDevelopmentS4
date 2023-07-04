using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjetAPIDevelopmentS4.Authorization;
using ProjetAPIDevelopmentS4.Models;
using ProjetAPIDevelopmentS4.Services;

namespace ProjetAPIDevelopmentS4.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReservationController : Controller
    {
        private readonly ReservationsService _reservationsService;
        private readonly VolsService _volsService;

        public ReservationController(ReservationsService reversationService, VolsService volsService) {
            _reservationsService = reversationService;
            _volsService = volsService;

        }

        [HttpGet]
        public async Task<List<Reservation>> Get() =>
        await _reservationsService.GetReservationAsync();

        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Reservation>> Get(string id)
        {
            var vol = await _reservationsService.GetReservationAsync(id);

            if (vol is null)
            {
                return NotFound();
            }

            return vol;
        }

        // POST: VolController/Create
        [HttpPost]
        public async Task<IActionResult> Post(Reservation newReservation)
        {
            var volIsExist = await _volsService.CheckVolExist(newReservation.IdVol);

            if (volIsExist is null) {
                return BadRequest("cette avion n'exist pas !");
            }
            else
            {
                await _reservationsService.CreateReservationAsync(newReservation);
            }
            return CreatedAtAction(nameof(Get), new { id = newReservation.Id }, newReservation);
        }

        // POST: VolController/Edit/5
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Reservation updatedReservation)
        {
            var reservation = await _reservationsService.GetReservationAsync(id);
                        
            if (reservation is null)
            {
                return NotFound();
            }

            updatedReservation.Id = reservation.Id;

            await _reservationsService.UpdateReservationAsync(id, updatedReservation);

            return NoContent();
        }


        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var reservation = await _reservationsService.GetReservationAsync(id);

            if (reservation is null)
            {
                return NotFound();
            }

            await _reservationsService.RemoveReservationAsync(id);

            return NoContent();
        }
    }
}
