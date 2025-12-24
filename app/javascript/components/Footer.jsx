import React from "react";

export default function Footer({ qrImagePath = "/assets/tempImageeKmAyg 1.png" }) {
  return (
    <footer className="footer">
      <a
        href="https://www.instagram.com/tokyoturntable"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-qr-link"
      >
        <img
          src={qrImagePath}
          alt="Tokyo Turntable Instagram QR Code"
          className="footer-qr-image"
        />
      </a>
    </footer>
  );
}
