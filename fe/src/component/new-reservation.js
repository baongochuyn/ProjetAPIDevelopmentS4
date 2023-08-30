import React from 'react';
import "./new-reservation.css";
import { useStore, actions } from '../store';
import { useState } from 'react';

function NewReservation() {
    const [state, dispatch] = useStore()
    const {vol, setVol} = state

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit =(event) =>{
        event.preventDefault();
        dispatch(actions.setReservedVol(setVol));

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: username, password: password }),
          };
          fetch("https://localhost:7183/api/Users/authenticate", requestOptions)
            .then((response) => response.text())
            .then((data) => {
              localStorage.setItem("Authorization", `Basic ${data}`);
              window.location.href = "http://localhost:3000/newClients";
            });
    }

    return (
        <div className="form-detail">
            <div>
            <h2>Flight Booking Form</h2>
            </div>
            <form id="new-reservation-form">
                <div className="form-group">
                    <label htmlFor="flightNumber">Numéro de vol: {setVol?.IdentifiantAvion}  </label>
                    {/* <input value = {setVol.IdentifiantAvion} type="text" id="flightNumber" name="flightNumber" required  /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="departureCity">Ville de départ: {setVol?.VilleDepart}</label>
                    {/* <input value= {setVol.VilleDepart} type="text" id="departureCity" name="departureCity" required /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalCity">Ville d'arrivée: {setVol?.VilleArrivee}</label>
                    {/* <input value= {setVol.VilleArrivee} type="text" id="arrivalCity" name="arrivalCity" required /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="departureTime">Heure de départ: {setVol?.HeureDepart} </label>
                    {/* <input value= {setVol.HeureDepart} type="text" id="departureTime" name="departureTime" required /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="arrivalTime">Heure d'arrivée: {setVol?.HeureArrivee}</label>
                    {/* <input value= {setVol.HeureArrivee} type="text" id="arrivalTime" name="arrivalTime" required /> */}
                </div>
                <div className="form-group">
                    <label htmlFor="seatCount">Nombre de places: {setVol?.NombreDePlaces}</label>
                    {/* <input value= {setVol.NombreDePlaces} type="number" id="seatCount" name="seatCount" required /> */}
                </div>
                
                <div className="form-group">
                    <button onClick={handleSubmit}> Reserver </button>
                </div>
            </form>
        </div>
    );
}

export default NewReservation;
