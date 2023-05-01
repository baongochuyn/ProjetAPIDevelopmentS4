using ProjetAPIDevelopmentS4.Models;
using ProjetAPIDevelopmentS4.Services;
using ProjetAPIDevelopmentS4.Authorization;

// Create web application instance by builder
var builder = WebApplication.CreateBuilder(args);

// Add services to web application.

// Add service database mongodb
builder.Services.Configure<AirportDatabaseSetting>(
    builder.Configuration.GetSection("AirportDatabaseSetting"));

// Add services that used by controller and each other.
builder.Services.AddSingleton<ClientsService>();
builder.Services.AddSingleton<IUserService, UserService>();
builder.Services.AddSingleton<VolsService>();
builder.Services.AddSingleton<ReservationsService>();

// Add using Controllers
builder.Services.AddControllers()
     .AddJsonOptions(
        options => options.JsonSerializerOptions.PropertyNamingPolicy = null);



builder.Services.AddEndpointsApiExplorer();
// web swagger for end point.
builder.Services.AddSwaggerGen();

var app = builder.Build();

// create authorization middleware

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
builder.WithOrigins("http://localhost:3000")
.AllowAnyHeader()
.AllowCredentials()
.AllowAnyMethod());

app.UseMiddleware<BasicAuthMiddleware>();

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
