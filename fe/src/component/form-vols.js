import Navbar from "./navigation-bar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VolForm() {
  const [villeDepart, setVilleDepart] = useState("");
  const [villeArrivee, setVilleArrivee] = useState("");
  const [heureDepart, setHeureDepart] = useState("");
  const [heureArrivee, setHeureArrivee] = useState("");
  const [identifiantAvion, setIdentifiantAvion] = useState(0);
  const [nombreDePlaces, setNombreDePlaces] = useState(0);

  const authorization = localStorage.getItem("Authorization");

  if (!authorization) window.location.href = "http://localhost:3000/";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({
        VilleDepart: villeDepart,
        VilleArrivee: villeArrivee,
        HeureDepart: heureDepart,
        HeureArrivee: heureArrivee,
        IdentifiantAvion: identifiantAvion,
        NombreDePlaces: nombreDePlaces,
      }),
    };
    fetch(`https://localhost:7183/api/Vol`, requestOptions)
      .then((response) => response.text())

      .catch((err) => {
        console.log(err);
      })
      .then((data) => {
        window.location.href = "http://localhost:3000/vols";
      });
  };
  return !authorization ? (
    <div>loading...</div>
  ) : (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Update Vol</legend>
          <div>
            <label htmlFor="numeroVol">Numéro de vol:</label>
            <input
              type="number"
              id="numeroVol"
              value={identifiantAvion}
              onChange={(e) => setIdentifiantAvion(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="villeDepart">Ville de départ:</label>
            <input
              type="text"
              id="villeDepart"
              value={villeDepart}
              onChange={(e) => setVilleDepart(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="villeArrivee">Ville d'arrivée:</label>
            <input
              type="text"
              id="villeArrivee"
              value={villeArrivee}
              onChange={(e) => setVilleArrivee(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="heureDepart">Heure de départ:</label>
            <input
              type="datetime-local"
              id="heureDepart"
              value={heureDepart?.substring(0, heureDepart.length - 1)}
              onChange={(e) => setHeureDepart(e.target.value + ":00Z")}
            />
          </div>
          <div>
            <label htmlFor="heureArrivee">Heure d'arrivée:</label>
            <input
              type="datetime-local"
              id="heureArrivee"
              value={heureArrivee?.substring(0, heureArrivee.length - 1)}
              onChange={(e) => setHeureArrivee(e.target.value + ":00Z")}
            />
          </div>

          <div>
            <label htmlFor="nombreDePlaces">Nombre de places:</label>
            <input
              type="number"
              id="nombreDePlaces"
              value={nombreDePlaces}
              onChange={(e) => setNombreDePlaces(e.target.value)}
            />
          </div>
          <button type="submit">Ajouter</button>
        </fieldset>
      </form>
    </div>
  );
}

export default VolForm;
