// React entry point - separate from importmap
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import SpotifyWidget from "./components/SpotifyWidget"

document.addEventListener("DOMContentLoaded", () => {
  // Mount main App component
  const rootEl = document.getElementById("react-root")
  if (rootEl) {
    const root = createRoot(rootEl)
    root.render(React.createElement(App))
  }

  // Mount Spotify widget in navbar
  const widgetEl = document.getElementById("spotify-widget-root")
  if (widgetEl) {
    // data-playlist-id becomes dataset.playlistId (kebab-case to camelCase)
    const playlistId = widgetEl.dataset.playlistId || widgetEl.getAttribute("data-playlist-id")
    console.log("Spotify Widget - Element found:", widgetEl)
    console.log("Spotify Widget - Playlist ID:", playlistId)
    try {
      const widgetRoot = createRoot(widgetEl)
      widgetRoot.render(React.createElement(SpotifyWidget, { playlistId }))
    } catch (error) {
      console.error("Error mounting Spotify widget:", error)
    }
  } else {
    console.error("Spotify widget mount point not found: #spotify-widget-root")
  }
})
