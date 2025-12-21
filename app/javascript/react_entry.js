// React entry point - separate from importmap
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import Navbar from "./components/Navbar"

document.addEventListener("DOMContentLoaded", () => {
  // Mount main App component
  const rootEl = document.getElementById("react-root")
  if (rootEl) {
    const root = createRoot(rootEl)
    root.render(React.createElement(App))
  }

  // Mount Navbar component
  const navbarEl = document.getElementById("navbar-root")
  if (navbarEl) {
    // Get playlist ID from data attribute
    let playlistId = navbarEl.dataset.playlistId || navbarEl.getAttribute("data-playlist-id")
    // Convert empty string to null for cleaner prop handling
    if (playlistId === "" || playlistId === null || playlistId === undefined) {
      playlistId = null
    }
    // Get logo path from data attribute (or use default)
    const logoPath = navbarEl.dataset.logoPath || "/assets/logo3.png"

    console.log("Navbar - Playlist ID:", playlistId)
    console.log("Navbar - Logo Path:", logoPath)

    try {
      const navbarRoot = createRoot(navbarEl)
      navbarRoot.render(React.createElement(Navbar, { playlistId, logoPath }))
    } catch (error) {
      console.error("Error mounting Navbar:", error)
    }
  } else {
    console.error("Navbar mount point not found: #navbar-root")
  }
})
