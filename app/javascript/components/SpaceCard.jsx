import React from "react";

export default function SpaceCard({ space }) {
  return (
    <div className="space-card">
      {space.photo_url && (
        <div className="space-card-image">
          <img src={space.photo_url} alt={space.name} />
        </div>
      )}
      <div className="space-card-content">
        <h3 className="space-card-name">{space.name}</h3>
        <div className="space-card-meta">
          <span className="space-card-category">{space.category}</span>
          {space.music_genre && (
            <span className="space-card-genre">• {space.music_genre}</span>
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
