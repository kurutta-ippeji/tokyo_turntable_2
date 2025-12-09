require 'net/http'
require 'uri'
require 'json'

class SpotifyToken
  TOKEN_URL = URI("https://accounts.spotify.com/api/token")

  def self.fetch
    client_id = Rails.application.credentials.spotify[:client_id]
    client_secret = Rails.application.credentials.spotify[:client_secret]

    req = Net::HTTP::Post.new(TOKEN_URL)
    req.basic_auth(client_id, client_secret)
    req.set_form_data({ "grant_type" => "client_credentials" })

    res = Net::HTTP.start(TOKEN_URL.hostname, TOKEN_URL.port, use_ssl: true) do |http|
      http.request(req)
    end

    # Handle errors
    unless res.is_a?(Net::HTTPSuccess)
      Rails.logger.error "Spotify token error: #{res.code} - #{res.body}"
      raise "Failed to get Spotify access token: #{res.code}"
    end

    JSON.parse(res.body)["access_token"]
  end
end
