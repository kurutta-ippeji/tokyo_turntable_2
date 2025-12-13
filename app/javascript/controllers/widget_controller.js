import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { playlistId: String }

  connect() {
    this.loadTrack()
  }

  loadTrack() {
    const playlistId = this.playlistIdValue

    if (!playlistId || playlistId === "YOUR_PLAYLIST_ID_HERE") {
      console.error("Widget: Playlist ID not found or not configured")
      this.element.innerHTML = "<p>Please configure your Spotify playlist ID in the navbar.</p>"
      return
    }

    fetch(`/spotify/playlist/${playlistId}`)
      .then(res => {
        if (!res.ok) {
          return res.json().then(data => {
            throw new Error(data.error || `HTTP error! status: ${res.status}`)
          }).catch(() => {
            throw new Error(`HTTP error! status: ${res.status}`)
          })
        }
        return res.json()
      })
      .then(tracks => {
        if (!tracks || !tracks.length || tracks.error) {
          this.element.innerHTML = "<p>No tracks available.</p>"
          return
        }

        // Pick a random track from the playlist
        const track = tracks[Math.floor(Math.random() * tracks.length)]

        // Extract track ID from URI (format: spotify:track:TRACK_ID)
        const trackId = track.track_uri?.split(':').pop() || ''

        if (!trackId) {
          this.element.innerHTML = "<p>Track ID not found.</p>"
          return
        }

        // Create Spotify embed URL for the track
        const embedUrl = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`

        this.element.innerHTML = `
          <div class="widget-inner">
            <div class="widget-player">
              <iframe
                src="${embedUrl}"
                frameBorder="0"
                allowtransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                class="widget-iframe">
              </iframe>
            </div>
          </div>
        `
      })
      .catch((error) => {
        console.error("Widget error:", error)
        this.element.innerHTML = `<p>Error loading track: ${error.message}</p>`
      })
  }
}
