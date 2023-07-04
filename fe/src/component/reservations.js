import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./vols.css";
import Navbar from "./navigation-bar";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [clients, setClients] = useState([]);
  const [vols, setVols] = useState([]);

  const authorization = localStorage.getItem("Authorization");
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };
  useEffect(() => {
    fetch("https://localhost:7183/api/Reservation", requestOptions)
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
        setReservations(data);
      });
    fetch("https://localhost:7183/api/Client", requestOptions)
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
        setClients(data);
      });
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
        setVols(data);
      });
  }, []);

  const listRender = reservations.map((elm) => {
    let client = {};
    let vol = {};
    clients.map((c) => {
      if (elm.IdClient == c.Id) {
        client = c;
      }
    });
    vols.map((v) => {
      if (elm.IdVol == v.Id) {
        vol = v;
        console.log(vol);
      }
    });
    return (
      <tbody key={elm.Id}>
        <td>{elm.Id}</td>
        <td>{vol.IdentifiantAvion}</td>
        <td>{client.FirstName}</td>
        <td>{client.LastName}</td>
        <td>{vol.VilleDepart}</td>
        <td>{vol.VilleArrivee}</td>
        <td>{vol.HeureDepart}</td>
        <td>{vol.HeureArrivee}</td>
      </tbody>
    );
  });
  return (
    <div>
      <Navbar />
      <table>
        <thead>
          <tr className="tableTR">
            <td>N° Reservation</td>
            <td>N° Vol</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Ville Depart</td>
            <td>Ville Arrivee</td>
            <td>Heure Depart</td>
            <td>Heure Arrivee</td>
          </tr>
        </thead>
        {listRender}
      </table>
    </div>
  );
}
export default Reservations;
