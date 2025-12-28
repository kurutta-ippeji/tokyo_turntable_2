// React entry point - separate from importmap
import React from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App"
import Navbar from "./components/Navbar"
import Logo from "./components/Logo"
import About from "./components/About"
import Footer from "./components/Footer"
import SpacesList from "./components/SpacesList"
import StoresList from "./components/StoresList"

// Store roots to unmount on navigation
const roots = new Map()

function mountComponents() {
  // Unmount previous roots
  roots.forEach((root, element) => {
    try {
      root.unmount()
    } catch (error) {
      // Ignore unmount errors
    }
  })
  roots.clear()

  // Mount main App component
  const rootEl = document.getElementById("react-root")
  if (rootEl) {
    const root = createRoot(rootEl)
    root.render(React.createElement(App))
    roots.set(rootEl, root)
  }

  // Mount Logo component
  const logoEl = document.getElementById("logo-root")
  if (logoEl) {
    const logoPath = logoEl.dataset.logoPath || "/assets/logo4.png"
    try {
      const logoRoot = createRoot(logoEl)
      logoRoot.render(React.createElement(Logo, { logoPath }))
      roots.set(logoEl, logoRoot)
    } catch (error) {
      console.error("Error mounting Logo:", error)
    }
  }

  // Mount Navbar component
  const navbarEl = document.getElementById("navbar-root")
  if (navbarEl) {
    try {
      const navbarRoot = createRoot(navbarEl)
      navbarRoot.render(React.createElement(Navbar))
      roots.set(navbarEl, navbarRoot)
    } catch (error) {
      console.error("Error mounting Navbar:", error)
    }
  }

  // Mount Footer component
  const footerEl = document.getElementById("footer-root")
  if (footerEl) {
    // Get Instagram image path from data attribute
    const instagramImagePath = footerEl.dataset.instagramImagePath || footerEl.getAttribute("data-instagram-image-path") || "/assets/instagram_logo.png"
    try {
      const footerRoot = createRoot(footerEl)
      footerRoot.render(React.createElement(Footer, { instagramImagePath }))
      roots.set(footerEl, footerRoot)
    } catch (error) {
      console.error("Error mounting Footer:", error)
    }
  }

  // Mount About component
  const aboutEl = document.getElementById("about-root")
  if (aboutEl) {
    try {
      const aboutRoot = createRoot(aboutEl)
      aboutRoot.render(React.createElement(About))
      roots.set(aboutEl, aboutRoot)
    } catch (error) {
      console.error("Error mounting About:", error)
    }
  }

  // Mount SpacesList component
  const spacesListEl = document.getElementById("spaces-list-root")
  if (spacesListEl) {
    try {
      // Try to get data from script tag first, then fall back to data attribute
      let spacesJson = "[]"
      const spacesDataScript = document.getElementById("spaces-data")
      if (spacesDataScript) {
        spacesJson = spacesDataScript.textContent.trim()
      } else if (spacesListEl.dataset.spaces) {
        spacesJson = spacesListEl.dataset.spaces
      }

      const spacesData = JSON.parse(spacesJson)
      const title = spacesListEl.dataset.title || "Listening Spaces"
      console.log("SpacesList - Title:", title)
      console.log("SpacesList - Spaces count:", spacesData.length)
      console.log("SpacesList - Spaces data:", spacesData)
      const spacesListRoot = createRoot(spacesListEl)
      spacesListRoot.render(React.createElement(SpacesList, { spaces: spacesData, title }))
      roots.set(spacesListEl, spacesListRoot)
    } catch (error) {
      console.error("Error mounting SpacesList:", error)
      console.error("Error details:", error.message, error.stack)
    }
  }

  // Mount StoresList component
  const storesListEl = document.getElementById("stores-list-root")
  if (storesListEl) {
    try {
      const storesData = JSON.parse(storesListEl.dataset.stores || "[]")
      const storesListRoot = createRoot(storesListEl)
      storesListRoot.render(React.createElement(StoresList, { stores: storesData }))
      roots.set(storesListEl, storesListRoot)
    } catch (error) {
      console.error("Error mounting StoresList:", error)
    }
  }
}

// Mount on initial page load
document.addEventListener("DOMContentLoaded", mountComponents)

// Mount on Turbo navigation (Rails 7 uses Turbo by default)
document.addEventListener("turbo:load", mountComponents)
