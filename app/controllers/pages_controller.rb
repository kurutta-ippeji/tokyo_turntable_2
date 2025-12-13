class PagesController < ApplicationController
  def home
    # Pre-load one track per day - same track for all users throughout the day
    # This allows for aggressive caching and fast page loads
    begin
      playlist_id = Rails.application.credentials.spotify[:playlist_id]
      if playlist_id.present?
        # Use date as part of cache key so it changes daily
        today = Date.today.to_s
        cache_key = "spotify_track_of_day_#{playlist_id}_#{today}"

        @spotify_embed_url = Rails.cache.fetch(cache_key, expires_in: 1.day) do
          # Fetch playlist tracks (cache for 1 hour since we only need it once per day)
          tracks = Rails.cache.fetch("spotify_playlist_#{playlist_id}", expires_in: 1.hour) do
            SpotifyPlaylist.fetch(playlist_id)
          end

          if tracks.is_a?(Array) && tracks.any?
            # Use date to deterministically select a track (same track all day)
            track_index = Date.today.yday % tracks.length
            selected_track = tracks[track_index]
            track_id = selected_track[:track_uri]&.split(':')&.last
            "https://open.spotify.com/embed/track/#{track_id}?utm_source=generator&theme=0" if track_id
          end
        end
      end
    rescue => e
      Rails.logger.error "Error pre-loading Spotify track: #{e.message}"
      # Continue without pre-loaded track - widget controller will handle it
    end
  end
end
