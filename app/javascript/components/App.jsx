import React from "react";

export default function App() {
  // Get playlist ID from data attribute on react-root element
  const rootEl = document.getElementById("react-root");
  const playlistId = rootEl?.dataset.playlistId || null;

  return (
    <div>
    </div>
  );
}
