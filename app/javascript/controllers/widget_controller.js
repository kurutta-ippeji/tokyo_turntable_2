import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = { playlistId: String }

  connect() {
    this.loadTrack()
  }

  loadTrack() {
    const playlistId = this.playlistIdValue

    fetch(`/spotify/playlist/${playlistId}`)
      .then(res => res.json())
      .then(tracks => {
        if (!tracks.length) {
          this.element.innerHTML = "<p>No tracks available.</p>"
          return
        }

        const track = tracks[Math.floor(Math.random() * tracks.length)]

        this.element.innerHTML = `
          <div class="turntable-inner">
            <p class='text-xs opacity-70'>On the Turntable</p>
            <p><strong>${track.track_name}</strong></p>
            <p class='opacity-80'>${track.artist_name}</p>
          </div>
        `
      })
      .catch(() => {
        this.element.innerHTML = "<p>Error loading playlist.</p>"
      })
  }
}
