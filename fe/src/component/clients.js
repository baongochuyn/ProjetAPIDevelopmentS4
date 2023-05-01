import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./vols.css";
import Navbar from "./navigation-bar";

function Clients() {
  const [clients, setClients] = useState([]);

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
    fetch(`https://localhost:7183/api/Client/${id}`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        const newClients = clients.filter((elm) => elm.Id !== id);
        setClients(newClients);
      });
  };

  useEffect(() => {
    fetch("https://localhost:7183/api/Client", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: authorization,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setClients(data);
      });
  }, []);

  const listRender = clients.map((elm) => {
    return (
      <tbody key={elm.Id}>
        <tr>
          <td>{elm.Id}</td>
          <td>{elm.FirstName}</td>
          <td>{elm.LastName}</td>
          <td>{elm.Address}</td>
          <td>{elm.Birthday}</td>
          <td>{elm.Tel}</td>
          <td>{elm.Email}</td>
          <td>{elm.NbPasseport}</td>
          <td>
            <Link to={`/clients/${elm.Id}`}>
              <button value={elm.Id}>Modify</button>
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
        </tr>
      </tbody>
    );
  });
  return (
    <div>
      <Navbar />
      <Link to={"/newClients"}>
        <button>Add New Client</button>
      </Link>
      <table>
        <thead>
          <tr className="tableTR">
            <td>ID Client</td>
            <td>First Name</td>
            <td>Last Name</td>
            <td>Address</td>
            <td>Birthday</td>
            <td>Tel</td>
            <td>Email</td>
            <td>N° Passeport</td>
            <td>Modify</td>
            <td>Delete</td>
          </tr>
        </thead>
        {listRender}
      </table>
    </div>
  );
}
export default Clients;
