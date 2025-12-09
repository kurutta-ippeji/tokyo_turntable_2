class SpotifyController < ApplicationController
  def playlist
    playlist_id = params[:id]
    tracks = SpotifyPlaylist.fetch(playlist_id)

    if tracks.is_a?(Hash) && tracks[:error]
      render json: { error: tracks[:error] }, status: tracks[:status] || 500
    else
      render json: tracks
    end
  end
end
