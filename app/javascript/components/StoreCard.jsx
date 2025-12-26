import React from "react";

export default function StoreCard({ store }) {
  return (
    <div className="store-card">
      {store.photo_url && (
        <div className="store-card-image">
          <img src={store.photo_url} alt={store.name} />
        </div>
      )}
      <div className="store-card-content">
        <h3 className="store-card-name">{store.name}</h3>
        {store.neighborhood && (
          <p className="store-card-neighborhood">{store.neighborhood}</p>
        )}
        {store.description && (
          <p className="store-card-description">{store.description}</p>
        )}
        {store.address && (
          <p className="store-card-address">{store.address}</p>
        )}
        {store.website_url && (
          <a
            href={store.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="store-card-website"
          >
            Visit Website
          </a>
        )}
      </div>
    </div>
  );
}
