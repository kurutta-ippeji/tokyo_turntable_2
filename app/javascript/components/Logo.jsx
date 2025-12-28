import React from "react";

export default function Logo({ logoPath = "/assets/logo4.png" }) {
  return (
    <div className="logo-wrapper">
      <a href="/" className="logo-link" data-turbo="false">
        <img src={logoPath} alt="Tokyo Turntable" className="logo-image" />
      </a>
    </div>
  );
}
