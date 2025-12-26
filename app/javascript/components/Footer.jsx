import React from "react";

export default function Footer({ instagramImagePath = "/assets/instagram_logo.png" }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-instagram-section">
        <div className="footer-instagram-wrapper">
          <img
            src={instagramImagePath}
            alt="Tokyo Turntable Instagram"
            className="footer-instagram-image"
          />
          <a
            href="https://www.instagram.com/tokyo.turntable"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram-link-left"
            aria-label="Instagram - Left Half"
          />
        </div>
        <p className="footer-instagram-text">Follow</p>
      </div>
      <p className="footer-copyright">
        © {currentYear} Tokyo Turntable
      </p>
    </footer>
  );
}
