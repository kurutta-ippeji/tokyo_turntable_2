import React, { useState, useEffect } from "react";
import { aboutState } from "./aboutState";

export default function VerticalNavbar() {
  const [showAbout, setShowAbout] = useState(aboutState.getShowAbout());

  useEffect(() => {
    const unsubscribe = aboutState.subscribe((value) => {
      setShowAbout(value);
    });
    return unsubscribe;
  }, []);

  const handleAboutClick = (e) => {
    e.preventDefault();
    aboutState.setShowAbout(true);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    aboutState.setShowAbout(false);
  };

  return (
    <nav className="vertical-navbar">
      <a
        href="#"
        className={`vertical-navbar-link ${showAbout ? "active" : ""}`}
        onClick={handleAboutClick}
      >
        About
      </a>
      <a
        href="#contact"
        className="vertical-navbar-link"
        onClick={handleContactClick}
      >
        Contact
      </a>
    </nav>
  );
}
