namespace ProjetAPIDevelopmentS4.Controllers;

using Microsoft.AspNetCore.Mvc;
using ProjetAPIDevelopmentS4.Authorization;
using ProjetAPIDevelopmentS4.Models;
using ProjetAPIDevelopmentS4.Services;
using System.Text;

[Authorize]
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [AllowAnonymous]  //permet aux utilisateurs non authentifiés d'accéder à cette méthode
    [HttpPost("authenticate")]
    public async Task<IActionResult> Authenticate([FromBody]AuthenticateModel model)
    {
        //verifier user
        var user = await _userService.Authenticate(model.Username, model.Password);

        if (user == null)
            return BadRequest(new { message = "Username or password is incorrect" });

        var infoAuth = user.Username + ":" + user.Password;

        // encode user infos
        var bytesInfos = Encoding.UTF8.GetBytes(infoAuth);
        var authHeader =  Convert.ToBase64String(bytesInfos);
        
        return Ok(authHeader);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userService.GetAll();
        return Ok(users);
    }
}
