import React, { useState, useLayoutEffect } from "react";
import { aboutState } from "./aboutState";

export default function About() {
  const [showAbout, setShowAbout] = useState(aboutState.getShowAbout());

  // Use useLayoutEffect for synchronous updates before paint
  useLayoutEffect(() => {
    const unsubscribe = aboutState.subscribe((value) => {
      setShowAbout(value);
    });
    return unsubscribe;
  }, []);

  return (
    <div className={`about-container ${showAbout ? 'about-visible' : 'about-hidden'}`}>
      <div className="about-header">
        <h1>About</h1>
      </div>
      <div className="about-description">
        <div className="about-content-wrapper">
          <p>Tokyo Turntable is a hub for discovering Tokyo's listening and vinyl culture. From jazz kissaten and music-themed bars to record stores tucked throughout the city, it's an ever-growing collection of spaces made for listening.</p>
          <p>Whether you're crate-digging, sitting with a drink, or simply letting a record play through, Tokyo Turntable exists to guide you toward places where music comes first.</p>
        </div>
      </div>
    </div>
  );
}
