import { useEffect, useState } from "react";
import "./form.css";
import { Link } from "react-router-dom";
import Navbar from "./navigation-bar";
import { useLocation } from "react-router-dom";

function UpdateClients() {
  const [clients, setClients] = useState([]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nbPassport, setNbPassport] = useState("");

  const location = useLocation();
  const pathName = location.pathname;
  const path = pathName.split("/");
  const id = path[2];
  console.log(id);
  const handleFirstnameChange = (event) => {
    setFirstName(event.target.value);
  };
  const handleLastnameChange = (event) => {
    setLastName(event.target.value);
  };
  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleTelChange = (event) => {
    setTel(event.target.value);
  };
  const handleNbPassportChange = (event) => {
    setNbPassport(event.target.value);
  };
  const handleBirthdayChange = (event) => {
    setBirthday(event.target.value);
  };

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
        FirstName: firstName,
        LastName: lastName,
        Address: address,
        Email: email,
        Tel: tel,
        Birthday: birthday,
        NbPasseport: nbPassport,
      }),
    };
    fetch(`https://localhost:7183/api/Client/${id}`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        window.location.href = "http://localhost:3000/clients";
      });
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
        console.log(data);
        const newClients = data.filter((elm) => elm.Id === id);
        setClients(newClients);
        setFirstName(newClients[0].FirstName);
        setLastName(newClients[0].LastName);
        setAddress(newClients[0].Address);
        setBirthday(newClients[0].Birthday);
        setEmail(newClients[0].Email);
        setTel(newClients[0].Tel);
        setNbPassport(newClients[0].NbPasseport);
      });
  }, []);
  console.log(clients);
  return (
    <div>
      <Navbar />
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Nouveau client</legend>
          <div>
            <label>First Name : </label>
            <input
              type="text"
              value={firstName}
              onChange={handleFirstnameChange}
            ></input>
          </div>
          <div>
            <label>Last Name : </label>
            <input
              type="text"
              value={lastName}
              onChange={handleLastnameChange}
            ></input>
          </div>
          <div>
            <label>Address : </label>
            <input
              type="text"
              value={address}
              onChange={handleAddressChange}
            ></input>
          </div>
          <div>
            <label>Email : </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
            ></input>
          </div>
          <div>
            <label>Tel : </label>
            <input type="text" value={tel} onChange={handleTelChange}></input>
          </div>
          <div>
            <label>Birthday : </label>
            <input
              type="date"
              value={birthday}
              onChange={handleBirthdayChange}
            ></input>
          </div>
          <div>
            <label>NbPasseport : </label>
            <input
              type="text"
              value={nbPassport}
              onChange={handleNbPassportChange}
            ></input>
          </div>
          <div>
            <button type="submit">Modify</button>
          </div>
        </fieldset>
      </form>
      <div>
        <Link to="/Clients">
          <button>Retourner</button>
        </Link>
      </div>
    </div>
  );
}
export default UpdateClients;
