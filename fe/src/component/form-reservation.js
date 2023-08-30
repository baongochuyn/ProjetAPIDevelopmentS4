import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navbar from "./navigation-bar";
import "./form.css"
function FormReservation() {
  const [clients, setClients] = useState([]);
  const [vols, setVols] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedVolValue, setSelectedVolValue] = useState("");
  const location = useLocation();
  const pathName = location.pathname;
  const path = pathName.split("/");
  const id = path[2];

  const authorization = localStorage.getItem("Authorization");
  if (!authorization) window.location.href = "http://localhost:3000/";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authorization,
    },
  };

  useEffect(() => {
    fetch("https://localhost:7183/api/Client", requestOptions)
      .then((res) => {
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

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleSelectVolChange = (event) => {
    setSelectedVolValue(event.target.value);
  };
  const handleAddClick = (event) => {
    event.preventDefault();
    let IdVol = selectedVolValue;
    if (id) {
      IdVol = id;
    }
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
      body: JSON.stringify({
        IdVol: IdVol,
        IdClient: selectedValue,
      }),
    };
    fetch("https://localhost:7183/api/Reservation", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        window.location.href = "http://localhost:3000/reservations";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Navbar />
      <form>
        <fieldset>
          <legend>Nouvelle reservation</legend>
          <div>
            <label>Vol : </label>
            <select onChange={handleSelectVolChange}>
              <option value={id}> {id}</option>
              {vols?.map((vol) => (
                <option key={vol.Id} value={vol.Id}>
                  {vol.Id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Client : </label>
            <select onChange={handleSelectChange}>
              <option value="">Sélectionnez un client</option>
              {clients?.map((client) => (
                <option key={client.Id} value={client.Id}>
                  {client.FirstName} {client.LastName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={handleAddClick}>Réserver</button>
          </div>
        </fieldset>
        <div>
          <Link to="/newClients">
            <button>Ajouter un client</button>
          </Link>
        </div>
      </form>
    </div>
  );
}
export default FormReservation;
