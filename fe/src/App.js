import "./App.css";
import HomePage from "./component/home-page";
import Vols from "./component/vols";
import FormClients from "./component/form-clients";
import Clients from "./component/clients";
import UpdateClients from "./component/form-update-client";
import FormReservation from "./component/form-reservation";
import Reservations from "./component/reservations";
import UpdateVol from "./component/form-update-vol";
import FormVols from "./component/form-vols";
import React from "react";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/vols" Component={Vols} />
          <Route path="/vols/:id" Component={UpdateVol} />
          <Route path="/newVols" Component={FormVols} />
          <Route path="/" Component={HomePage} />
          <Route path="/newClients" Component={FormClients} />
          <Route path="/clients" Component={Clients} />
          <Route path="/clients/:id" Component={UpdateClients} />
          <Route path="/formReservation" Component={FormReservation} />
          <Route path="/formReservation/:id" Component={FormReservation} />
          <Route path="/reservations" Component={Reservations}></Route>
        </Routes>
      </div>
    </Router>
  );
}
