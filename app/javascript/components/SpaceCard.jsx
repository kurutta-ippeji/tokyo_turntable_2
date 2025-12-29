import React from "react";

export default function SpaceCard({ space, isExpanded = false, onClick }) {
  const handleCardClick = (e) => {
    // Don't open expanded view if clicking on a link
    if (e.target.tagName === 'A' || e.target.closest('a')) {
      return
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <div
      className={`space-card ${isExpanded ? 'space-card-expanded' : ''}`}
      onClick={!isExpanded ? handleCardClick : undefined}
    >
      {space.photo_url && (
        <div className="space-card-image">
          <img
            src={space.photo_url}
            alt={space.name}
            onError={(e) => {
              console.error(`Failed to load image for ${space.name}:`, space.photo_url);
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}
      <div className="space-card-content">
        <h3 className="space-card-name">{space.name}</h3>
        <div className="space-card-meta">
          <span className="space-card-category">{space.category}</span>
          {space.style && (
            <span className="space-card-genre">• {space.style}</span>
          )}
        </div>
        {space.neighborhood && (
          <p className="space-card-neighborhood">{space.neighborhood}</p>
        )}
        {space.description && (
          <p className="space-card-description">{space.description}</p>
        )}
        {space.address && (
          <p className="space-card-address">{space.address}</p>
        )}
        {space.bandcamp && isExpanded && (
          <div className="space-card-player">
            <p className="space-card-player-label">Listen in:</p>
            <iframe
              key={`bandcamp-${space.id}`}
              style={{ border: 0, width: "100%", height: "42px" }}
              src={space.bandcamp}
              seamless
              title="Bandcamp Player"
            >
              <a href="https://sonnycriss.bandcamp.com/album/this-is-criss-rudy-van-gelder-remaster">
                This Is Criss! (Rudy Van Gelder Remaster) by Sonny Criss
              </a>
            </iframe>
          </div>
        )}
        {space.website_url && (
          <a
            href={space.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="space-card-website"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}
