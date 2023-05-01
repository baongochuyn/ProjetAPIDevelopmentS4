namespace ProjetAPIDevelopmentS4.Models;

using System.ComponentModel.DataAnnotations;

public class AuthenticateModel
{
    [Required] //ne peut pas avoir de valeur null
    public string Username { get; set; }

    [Required]
    public string Password { get; set; }
}
