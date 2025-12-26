import React from "react";
import SpaceCard from "./SpaceCard";

export default function SpacesList({ spaces = [] }) {
  return (
    <div className="spaces-list">
      <h1 className="spaces-list-title">Listening Spaces</h1>
      <div className="spaces-grid">
        {spaces.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
    </div>
  );
}
