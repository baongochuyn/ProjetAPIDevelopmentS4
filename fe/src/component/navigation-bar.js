import React from "react";
import "./navigation-bar.css";

function Navbar() {
  return (
    <nav>
      <div class="topnav">
        <a href="/vols" className="nav-link">
          Home
        </a>

        <a href="/clients" className="nav-link">
          Client
        </a>

        <a href="/vols" className="nav-link">
          Vol
        </a>

        <a href="/reservations" className="nav-link">
          Reservation
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
