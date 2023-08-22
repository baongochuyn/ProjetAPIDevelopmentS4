import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./vols.css";
import Navbar from "./navigation-bar";
import ListVols from "./vols-list";
import FormVol from "./form-vols";
import NewReservation from "./new-reservation";

function Vols() {
  const [vols, setVols] = useState([]);

  const authorization = localStorage.getItem("Authorization");

  const handleDeleteClick = (event, id) => {
    event.preventDefault();

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    };
    fetch(`https://localhost:7183/api/Vol/${id}`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        const newVols = vols.filter((elm) => elm.Id !== id);
        setVols(newVols);
      });
  };
  useEffect(() => {
    fetch("https://localhost:7183/api/Vol", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    })
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

  console.log(vols);
  const listRender = vols?.map((elm) => {
    return (
      <tbody key={elm.Id}>
        <tr>
          <td>{elm.Id}</td>
          <td>{elm.HeureArrivee}</td>
          <td>{elm.HeureDepart}</td>
          <td>{elm.IdentifiantAvion}</td>
          <td>{elm.NombreDePlaces}</td>
          <td>{elm.VilleDepart}</td>
          <td>{elm.VilleArrivee}</td>

          <td>
            <Link to={`/formReservation/${elm.Id}`}>
              <button value={elm.Id}>Reserver</button>
            </Link>
          </td>
          <td>
            <button
              value={elm.Id}
              onClick={(event) => handleDeleteClick(event, elm.Id)}
            >
              Delete
            </button>
          </td>
          <td>
            <Link to={`/vols/${elm.Id}`}>
              <button value={elm.Id}>Modify</button>
            </Link>
          </td>
        </tr>
      </tbody>
    );
  });

  return vols.length === 0 ? (
    <div>loading...</div>
  ) : (
    <div className="App">
      <div className="container">
        <div className="sidebar"> 
        <Navbar />
        </div>
        <div className="left-column">
        <NewReservation></NewReservation>
        </div>
        <div className="right-column">
        <ListVols/> 
        </div>
      </div>

      {/* <Navbar />
      <ListVols/>
      <Link to={"/newVols"}>
        <button>Add New Vol</button>
      </Link>
      
      <table>
        <thead>
          <tr className="tableTR">
            <td>ID Vol</td>
            <td>Heure Arrivee</td>
            <td>Heure Depart</td>
            <td>Identifiant Avion</td>
            <td>Nombre De Places</td>
            <td>Ville Depart</td>
            <td>Ville Arrivee</td>
            <td>Reservation</td>
            <td>Delete</td>
            <td>Modify</td>
          </tr>
        </thead>
        {listRender}
      </table> */}
    </div>
  );
}

export default Vols;
