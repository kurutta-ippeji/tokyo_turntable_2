import React, { useState, useEffect, useRef } from "react";
import SpotifyWidget from "./SpotifyWidget";

export default function Navbar({ playlistId, logoPath = "/assets/logo3.png" }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = {
    liveShows: useRef(null),
    listeningSpaces: useRef(null),
    japaneseVinyl: useRef(null)
  };

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
    liveShows: {
      label: "live shows",
      items: [
        { label: "Upcoming Shows", href: "/live-shows/upcoming" },
        { label: "Venues", href: "/live-shows/venues" },
        { label: "Past Events", href: "/live-shows/past" }
      ]
    },
    listeningSpaces: {
      label: "listening spaces",
      items: [
        { label: "Cafes", href: "/listening-spaces/cafes" },
        { label: "Bars", href: "/listening-spaces/bars" },
        { label: "Record Stores", href: "/listening-spaces/record-stores" }
      ]
    },
    japaneseVinyl: {
      label: "Japanese vinyl",
      items: [
        { label: "New Releases", href: "/vinyl/new-releases" },
        { label: "Classics", href: "/vinyl/classics" },
        { label: "Rare Finds", href: "/vinyl/rare" }
      ]
    }
  };

  return (
    <nav className="navbar navbar-expand-lg position-relative">
      <div className="container-fluid px-0">
        <div className="navbar-logo-wrapper">
          <a href="/" className="navbar-brand d-flex align-items-center" data-turbo="false">
            <img src={logoPath} alt="Tokyo Turntable" className="me-2" />
          </a>
          <span className="navbar-logo-text">Tokyo Turntable</span>
          <span className="navbar-phrases">
            {Object.entries(dropdowns).map(([key, dropdown]) => (
              <div
                key={key}
                ref={dropdownRefs[key]}
                className="navbar-phrase-col navbar-dropdown"
              >
                <button
                  className="navbar-dropdown-toggle"
                  onClick={() => toggleDropdown(key)}
                  aria-expanded={openDropdown === key}
                >
                  {dropdown.label} ▾
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
            ))}
          </span>
        </div>
        <div className="navbar-widget-wrapper">
          <SpotifyWidget playlistId={playlistId} />
        </div>
      </div>
    </nav>
  );
}
