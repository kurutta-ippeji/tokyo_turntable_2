import React, { useState, useEffect, useRef } from "react";
import { aboutState } from "./aboutState";
import { expandedState } from "./expandedState";

export default function Navbar({ spacesAreas = [], storesAreas = [] }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAbout, setShowAbout] = useState(aboutState.getShowAbout());
  const [isExpanded, setIsExpanded] = useState(expandedState.getIsExpanded());
  const [hasAboutSection, setHasAboutSection] = useState(false);
  const dropdownRefs = {
    spaces: useRef(null),
    stores: useRef(null),
    about: useRef(null)
  };

  // Check if we're on a page with About section
  useEffect(() => {
    const aboutRoot = document.getElementById("about-root");
    setHasAboutSection(!!aboutRoot);
    if (!aboutRoot) {
      setShowAbout(false);
    }
  }, []);

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

  // Generate area items dynamically from props
  const spacesAreaItems = [
    { label: "Anywhere", href: "/spaces" },
    ...spacesAreas.map(area => ({
      label: area,
      href: `/spaces/area/${area.toLowerCase()}`
    }))
  ];

  const storesAreaItems = [
    { label: "Anywhere", href: "/stores" },
    ...storesAreas.map(area => ({
      label: area,
      href: `/stores/area/${area.toLowerCase()}`
    }))
  ];

  const dropdowns = {
    spaces: {
      label: "Spaces",
      sections: [
        {
          header: "Style",
          items: [
            { label: "All", href: "/spaces" },
            { label: "Jazz", href: "/spaces/style/jazz" },
            { label: "Classical", href: "/spaces/style/classical" },
            { label: "Folk", href: "/spaces/style/folk" },
            { label: "DJ", href: "/spaces/style/dj" }
          ]
        },
        {
          header: "Area",
          items: spacesAreaItems
        }
      ]
    },
    stores: {
      label: "Stores",
      sections: [
        {
          header: "Focus",
          items: [
            { label: "All", href: "/stores" },
            { label: "Curated", href: "/stores/focus/curated" },
            { label: "Genre-specific", href: "/stores/focus/genre-specific" },
            { label: "Vintage", href: "/stores/focus/vintage" },
            { label: "Record cafe", href: "/stores/focus/record-cafe" }
          ]
        },
        {
          header: "Area",
          items: storesAreaItems
        }
      ]
    },
    events: {
      label: "Events",
      href: "/events"
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    // Check if we're on the home page (has about-root element)
    const aboutRoot = document.getElementById("about-root");
    if (aboutRoot) {
      aboutState.setShowAbout(true);
    } else {
      // Navigate to home page with hash to indicate About should be shown
      window.location.href = "/#about";
    }
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
                {dropdown.href ? (
                  // Simple link (no dropdown)
                  <div className="navbar-phrase-col">
                    <a href={dropdown.href} className="navbar-dropdown-toggle">
                      {dropdown.label}
                    </a>
                  </div>
                ) : (
                  // Dropdown menu
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
                          // Render simple items
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
                )}
                <span className="navbar-phrase-separator">|</span>
              </React.Fragment>
            ))}
            <div className="navbar-phrase-col">
              <button
                className={`navbar-dropdown-toggle ${showAbout && hasAboutSection ? 'active' : ''}`}
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
