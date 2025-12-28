import React from "react";

export default function Logo({ logoPath = "/assets/logo4.png" }) {
  return (
    <div className="logo-wrapper">
      <img src={logoPath} alt="Tokyo Turntable" className="logo-image" />
    </div>
  );
}
