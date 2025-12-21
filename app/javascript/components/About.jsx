import React, { useState, useEffect } from "react";
import { aboutState } from "./aboutState";

export default function About() {
  const [showAbout, setShowAbout] = useState(aboutState.getShowAbout());

  useEffect(() => {
    const unsubscribe = aboutState.subscribe((value) => {
      setShowAbout(value);
    });
    return unsubscribe;
  }, []);

  if (!showAbout) {
    return null;
  }

  return (
    <div className="about-description">
      <div className="about-content-wrapper">
        <p>We are a hub for exploring Tokyo through sound. Whether it's an underground live show, an intimate listening experience, or a hand-picked Japanese vinyl, you're sure to find what you're looking for.</p>
      </div>
    </div>
  );
}
