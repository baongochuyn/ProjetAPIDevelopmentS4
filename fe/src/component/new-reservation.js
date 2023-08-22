import React from 'react';
import "./new-reservation.css";

function NewReservation() {
    return (
        <div className="form-container">
            <div>
            <h2>Flight Booking Form</h2>
            </div>
            <form action="#" method="post">
                <div className="form-group">
                    <label htmlFor="flightNumber">Numéro de vol:</label>
                    <input type="text" id="flightNumber" name="flightNumber" required />
                </div>
                <div className="form-group">
                    <label htmlFor="departureCity">Ville de départ:</label>
                    <input type="text" id="departureCity" name="departureCity" required />
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalCity">Ville d'arrivée:</label>
                    <input type="text" id="arrivalCity" name="arrivalCity" required />
                </div>
                <div className="form-group">
                    <label htmlFor="departureTime">Heure de départ:</label>
                    <input type="time" id="departureTime" name="departureTime" required />
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalTime">Heure d'arrivée:</label>
                    <input type="time" id="arrivalTime" name="arrivalTime" required />
                </div>
                <div className="form-group">
                    <label htmlFor="seatCount">Nombre de places:</label>
                    <input type="number" id="seatCount" name="seatCount" required />
                </div>
                <div className="form-group">
                    <label htmlFor="firstName">Nom:</label>
                    <input type="text" id="firstName" name="firstName" required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Prénom:</label>
                    <input type="text" id="lastName" name="lastName" required />
                </div>
                <div className="form-group">
                    <label htmlFor="phoneNumber">Numéro de téléphone:</label>
                    <input type="tel" id="phoneNumber" name="phoneNumber" required />
                </div>
                <div className="form-group">
                    <input type="submit" value="Réserver" />
                </div>
            </form>
        </div>
    );
}

export default NewReservation;
