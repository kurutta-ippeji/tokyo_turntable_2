import React from "react";
import SpotifyWidget from "./SpotifyWidget";

export default function Navbar({ playlistId, logoPath = "/assets/logo3.png" }) {
  return (
    <nav className="navbar navbar-expand-lg position-relative">
      <div className="container-fluid px-0">
        <div className="navbar-logo-wrapper">
          <a href="/" className="navbar-brand d-flex align-items-center">
            <img src={logoPath} alt="Tokyo Turntable" className="me-2" />
          </a>
          <span className="navbar-logo-text">Tokyo Turntable
            <span className="navbar-logo-tagline">Explore Tokyo through sound</span>
          </span>
          <span className="navbar-phrases">
            <span className="navbar-phrase-col">live shows ▾</span>
            <span className="navbar-phrase-col">listening spaces ▾</span>
            <span className="navbar-phrase-col">Japanese vinyl ▾</span>
          </span>
        </div>
        <div className="navbar-widget-wrapper">
          <SpotifyWidget playlistId={playlistId} />
        </div>
      </div>
    </nav>
  );
}
