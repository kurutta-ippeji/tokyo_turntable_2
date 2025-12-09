require 'net/http'
require 'uri'
require 'json'

class SpotifyPlaylist
  BASE_URL = "https://api.spotify.com/v1/playlists/"

  def self.fetch(playlist_id)
    token = SpotifyToken.fetch
    url = URI("#{BASE_URL}#{playlist_id}/tracks")

    req = Net::HTTP::Get.new(url)
    req["Authorization"] = "Bearer #{token}"

    res = Net::HTTP.start(url.hostname, url.port, use_ssl: true) do |http|
      http.request(req)
    end

    # Handle errors
    unless res.is_a?(Net::HTTPSuccess)
      Rails.logger.error "Spotify API error: #{res.code} - #{res.body}"
      return { error: "Failed to fetch playlist", status: res.code }
    end

    data = JSON.parse(res.body)

    # Transform Spotify API response to match frontend expectations
    tracks = data["items"]&.map do |item|
      track = item["track"]
      next nil unless track # Skip null tracks

      # Get album art (use the smallest image, or medium if available)
      album_art = track.dig("album", "images")&.last&.dig("url") ||
                  track.dig("album", "images")&.first&.dig("url") ||
                  nil

      {
        track_name: track["name"],
        artist_name: track["artists"]&.map { |a| a["name"] }&.join(", ") || "Unknown Artist",
        album_art: album_art,
        track_uri: track["uri"],
        track_url: track.dig("external_urls", "spotify") || nil
      }
    end&.compact || []

    tracks
  end
end
