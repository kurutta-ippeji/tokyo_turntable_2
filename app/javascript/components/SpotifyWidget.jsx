import React, { useState, useEffect } from "react";

export default function SpotifyWidget({ playlistId }) {
  const [embedUrl, setEmbedUrl] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("SpotifyWidget - Received playlistId:", playlistId);

    // Reset states when playlistId changes
    setError(null);
    setEmbedUrl(null);
    setLoading(true);

    // If playlistId is null/undefined, keep loading (it might be passed down soon)
    // Only set error if playlistId is explicitly an empty string (confirmed missing)
    if (playlistId === null || playlistId === undefined) {
      // Keep loading - playlistId might be passed down in next render
      return;
    }

    // Only show error if playlistId is truly missing (empty string or invalid)
    const isValidPlaylistId = playlistId &&
                               playlistId !== "YOUR_PLAYLIST_ID_HERE" &&
                               playlistId !== "" &&
                               (typeof playlistId !== 'string' || playlistId.trim() !== "");

    if (!isValidPlaylistId) {
      // Only set error if it's explicitly empty (not null/undefined)
      if (playlistId === "") {
        setError("Playlist ID not configured");
      }
      setLoading(false);
      return;
    }

    fetch(`/spotify/playlist/${playlistId}`)
      .then((res) => {
        if (!res.ok) {
          return res.json().then((data) => {
            throw new Error(data.error || `HTTP error! status: ${res.status}`);
          });
        }
        return res.json();
      })
      .then((tracks) => {
        if (!tracks || !tracks.length || tracks.error) {
          setError("No tracks available");
          return;
        }

        // Pick a random track from the playlist
        const track = tracks[Math.floor(Math.random() * tracks.length)];

        // Extract track ID from URI (format: spotify:track:TRACK_ID)
        const trackId = track.track_uri?.split(":").pop() || "";

        if (!trackId) {
          setError("Track ID not found");
          return;
        }

        // Create Spotify embed URL for the track
        const url = `https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`;
        setEmbedUrl(url);
        setError(null); // Clear any previous errors
      })
      .catch((err) => {
        console.error("Widget error:", err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [playlistId]);

  // If we have an embedUrl, show it (even if there was a previous error)
  if (embedUrl) {
    return (
      <div className="widget-inner">
        <div className="widget-player">
          <iframe
            src={embedUrl}
            frameBorder="0"
            allowtransparency="true"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="widget-iframe"
            title="Spotify Player"
          />
        </div>
      </div>
    );
  }

  // Don't show error while loading - wait for fetch to complete
  if (loading) {
    return null; // Or a loading spinner if you want
  }

  // Only show error if we're done loading, have no embedUrl, and there's actually an error
  // Also check that we don't have a valid playlistId (to avoid showing error during initial render)
  if (error && !loading && !embedUrl && (!playlistId || playlistId === "" || playlistId === null)) {
    return (
      <div className="widget-inner">
        <p style={{ color: 'red', fontSize: '12px' }}>Error loading track: {error}</p>
      </div>
    );
  }

  return null;

}
