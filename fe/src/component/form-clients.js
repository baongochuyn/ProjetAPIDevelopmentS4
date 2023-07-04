import { useEffect, useState } from "react";
import "./form.css";
import { Link } from "react-router-dom";
import Navbar from "./navigation-bar";

function Clients() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [birthday, setBirthday] = useState("");
  const [nbPassport, setNbPassport] = useState("");

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

  if (!authorization) window.location.href = "http://localhost:3000/";

  const handleAddClick = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
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

    fetch("https://localhost:7183/api/Client", requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.text();
        } else {
          throw new Error("Request failed with status " + response.status);
        }
      })

      .catch((error) => {
        if (error.message.includes("Request failed with status 400")) {
          // Nếu response trả về mã lỗi 400
          alert("Client existe déjà !");
        }
      })
      .then((data) => {
        window.location.href = "http://localhost:3000/clients";
      });
  };

  return !authorization ? (
    <div>loading...</div>
  ) : (
    <div>
      <Navbar />
      <form>
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
            <button onClick={handleAddClick}>Add</button>
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
export default Clients;
