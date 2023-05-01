import Navbar from "./navigation-bar";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function VolUpdateForm() {
  const [vols, setVols] = useState([]);

  const [villeDepart, setVilleDepart] = useState("");
  const [villeArrivee, setVilleArrivee] = useState("");
  const [heureDepart, setHeureDepart] = useState("");
  const [heureArrivee, setHeureArrivee] = useState("");
  const [identifiantAvion, setIdentifiantAvion] = useState(0);
  const [nombreDePlaces, setNombreDePlaces] = useState(0);

  const location = useLocation();
  const pathName = location.pathname;
  const path = pathName.split("/");
  const id = path[2];

  const authorization = localStorage.getItem("Authorization");
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
      method: "PUT",
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
    fetch(`https://localhost:7183/api/Vol/${id}`, requestOptions)
      .then((response) => response.text())
      .then((data) => {});
  };
  useEffect(() => {
    fetch("https://localhost:7183/api/Vol", requestOptions)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          return res.json();
        } else if (res.status === 401) {
          window.location.href = "http://localhost:3000/";
        }
        return [];
      })
      .then((data) => {
        const newVols = data.filter((elm) => elm.Id === id);
        setVols(newVols);
        setHeureArrivee(newVols[0].HeureArrivee);
        setHeureDepart(newVols[0].HeureDepart);
        setIdentifiantAvion(newVols[0].IdentifiantAvion);
        setVilleArrivee(newVols[0].VilleArrivee);
        setVilleDepart(newVols[0].VilleDepart);
        setNombreDePlaces(newVols[0].NombreDePlaces);
      });
  }, []);
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Update Vol</legend>
          <div>
            <label>Vol : {id} </label>
          </div>
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
          <button type="submit">Modify</button>
        </fieldset>
      </form>
    </div>
  );
}

export default VolUpdateForm;
