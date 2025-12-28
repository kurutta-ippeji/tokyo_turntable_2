import React, { useState, useEffect, useRef } from "react";
import { aboutState } from "./aboutState";
import { expandedState } from "./expandedState";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAbout, setShowAbout] = useState(aboutState.getShowAbout());
  const [isExpanded, setIsExpanded] = useState(expandedState.getIsExpanded());
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

  // Subscribe to expandedState changes
  useEffect(() => {
    const unsubscribe = expandedState.subscribe((value) => {
      setIsExpanded(value);
      // Close dropdowns when card is expanded
      if (value) {
        setOpenDropdown(null);
      }
    });
    return unsubscribe;
  }, []);

  const handleDropdownEnter = (dropdownName) => {
    if (!isExpanded) {
      setOpenDropdown(dropdownName);
    }
  };

  const handleDropdownLeave = () => {
    setOpenDropdown(null);
  };

  const dropdowns = {
    spaces: {
      label: "Spaces",
      sections: [
        {
          header: "Style",
          items: [
            { label: "Jazz", href: "/spaces/style/jazz" },
            { label: "Classical", href: "/spaces/style/classical" },
            { label: "Folk", href: "/spaces/style/folk" },
            { label: "DJ", href: "/spaces/style/dj" }
          ]
        },
        {
          header: "Area",
          items: [
            { label: "Setagaya", href: "/spaces/area/setagaya" },
            { label: "Shibuya", href: "/spaces/area/shibuya" },
            { label: "Shimokitazawa", href: "/spaces/area/shimokitazawa" },
            { label: "Shinjuku", href: "/spaces/area/shinjuku" },
            { label: "Other", href: "/spaces/area/other" }
          ]
        }
      ]
    },
    stores: {
      label: "Stores",
      sections: [
        {
          header: "Focus",
          items: [
            { label: "New Arrivals", href: "/stores/focus/new-arrivals" },
            { label: "Vintage", href: "/stores/focus/vintage" },
            { label: "Genre-specific", href: "/stores/focus/genre-specific" },
            { label: "Crate digging", href: "/stores/focus/crate-digging" },
            { label: "Record cafe", href: "/stores/focus/record-cafe" }
          ]
        },
        {
          header: "Area",
          items: [
            { label: "Setagaya", href: "/stores/area/setagaya" },
            { label: "Shibuya", href: "/stores/area/shibuya" },
            { label: "Shimokitazawa", href: "/stores/area/shimokitazawa" },
            { label: "Shinjuku", href: "/stores/area/shinjuku" },
            { label: "Other", href: "/stores/area/other" }
          ]
        }
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
    <nav className={`navbar navbar-expand-lg position-relative ${isExpanded ? 'navbar-expanded-active' : ''}`}>
      <div className="container-fluid px-0">
        <div className="navbar-logo-wrapper">
          <span className="navbar-logo-text">
            <a href="/" className="navbar-logo-link" data-turbo="false">Tokyo Turntable</a>
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
                  onMouseEnter={() => handleDropdownEnter(key)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    className="navbar-dropdown-toggle"
                    aria-expanded={openDropdown === key}
                  >
                    {dropdown.label}
                  </button>
                  {openDropdown === key && (
                    <ul
                      className={`navbar-dropdown-menu ${dropdown.sections ? 'navbar-dropdown-menu-sections' : ''}`}
                      onMouseEnter={() => handleDropdownEnter(key)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      {dropdown.sections ? (
                        // Render sections side by side
                        dropdown.sections.map((section, sectionIndex) => (
                          <li key={sectionIndex} className="navbar-dropdown-section">
                            <div className="navbar-dropdown-header">
                              {section.header}
                            </div>
                            <ul className="navbar-dropdown-section-items">
                              {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>
                                  <a href={item.href}>
                                    {item.label}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))
                      ) : (
                        // Render simple items (for stores, guides)
                        dropdown.items.map((item, index) => (
                          <li key={index}>
                            <a href={item.href}>
                              {item.label}
                            </a>
                          </li>
                        ))
                      )}
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
