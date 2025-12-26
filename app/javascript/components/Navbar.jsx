import React, { useState, useEffect, useRef } from "react";
import { aboutState } from "./aboutState";

export default function Navbar({ logoPath = "/assets/logo4.png" }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAbout, setShowAbout] = useState(aboutState.getShowAbout());
  const dropdownRefs = {
    spaces: useRef(null),
    stores: useRef(null),
    guides: useRef(null),
    about: useRef(null)
  };

  // Subscribe to aboutState changes
  useEffect(() => {
    const unsubscribe = aboutState.subscribe((value) => {
      setShowAbout(value);
    });
    return unsubscribe;
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInside = Object.values(dropdownRefs).some(ref =>
        ref.current && ref.current.contains(event.target)
      );
      if (!isClickInside) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const dropdowns = {
    spaces: {
      label: "Spaces",
      items: [
        { label: "Jazz Kissas", href: "/spaces/jazz-kissaten" },
        { label: "Bars", href: "/spaces/bars" },
        { label: "By Area", href: "/spaces/by-area" }
      ]
    },
    stores: {
      label: "Stores",
      items: [
        { label: "Notable", href: "/stores/notable" },
        { label: "By Area", href: "/stores/by-area" },
      ]
    },
    guides: {
      label: "Guides",
      items: [
        { label: "Getting Started", href: "/guides/getting-started" },
        { label: "Events", href: "/guides/events" }
      ]
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    aboutState.setShowAbout(true);
  };

  return (
    <nav className="navbar navbar-expand-lg position-relative">
      <div className="container-fluid px-0">
        <div className="navbar-logo-wrapper">
          <a href="/" className="navbar-brand d-flex align-items-center" data-turbo="false">
            <img src={logoPath} alt="Tokyo Turntable" className="me-2" />
          </a>
          <span className="navbar-logo-text">Tokyo Turntable
            <span className="navbar-logo-tagline">
              Listening spaces and record stores in Tokyo
            </span>
          </span>
          <span className="navbar-phrases">
            {Object.entries(dropdowns).map(([key, dropdown], index) => (
              <React.Fragment key={key}>
                <div
                  ref={dropdownRefs[key]}
                  className="navbar-phrase-col navbar-dropdown"
                >
                  <button
                    className="navbar-dropdown-toggle"
                    onClick={() => toggleDropdown(key)}
                    aria-expanded={openDropdown === key}
                  >
                    {dropdown.label}
                  </button>
                  {openDropdown === key && (
                    <ul className="navbar-dropdown-menu">
                      {dropdown.items.map((item, index) => (
                        <li key={index}>
                          <a href={item.href} onClick={() => setOpenDropdown(null)}>
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <span className="navbar-phrase-separator">|</span>
              </React.Fragment>
            ))}
            <div className="navbar-phrase-col">
              <button
                className={`navbar-dropdown-toggle ${showAbout ? 'active' : ''}`}
                onClick={handleAboutClick}
              >
                About
              </button>
            </div>
          </span>
        </div>
      </div>
    </nav>
  );
}
