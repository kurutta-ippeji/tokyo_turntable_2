import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { playlistId: String }

  connect() {
    this.loadTrack()
  }

  loadTrack() {
    const playlistId = this.playlistIdValue

    if (!playlistId) {
      console.error("Widget: Playlist ID not found")
      this.element.innerHTML = "<p>Playlist ID not found.</p>"
      return
    }

    fetch(`/spotify/playlist/${playlistId}`)
      .then(res => res.json())
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
                width="60%"
                height="80"
                frameBorder="0"
                allowfullscreen=""
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
                style="border-radius: 8px;">
              </iframe>
            </div>
          </div>
        `
      })
      .catch((error) => {
        console.error("Widget error:", error)
        this.element.innerHTML = "<p>Error loading track.</p>"
      })
  }
}
