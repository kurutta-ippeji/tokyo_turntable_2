import React, { useState, useEffect } from "react";
import SpaceCard from "./SpaceCard";
import { expandedState } from "./expandedState";

export default function SpacesList({ spaces = [], title = "Listening Spaces" }) {
  // Ensure spaces is an array
  const spacesArray = Array.isArray(spaces) ? spaces : []
  const [selectedSpace, setSelectedSpace] = useState(null)

  const handleCardClick = (space) => {
    setSelectedSpace(space)
    expandedState.setIsExpanded(true)
  }

  const handleCloseExpanded = () => {
    setSelectedSpace(null)
    expandedState.setIsExpanded(false)
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (selectedSpace) {
        expandedState.setIsExpanded(false)
      }
    }
  }, [selectedSpace])

  if (spacesArray.length === 0) {
    return (
      <div className="spaces-list">
        <h1 className="spaces-list-title">{title}</h1>
        <p className="spaces-empty">No spaces found.</p>
      </div>
    )
  }

  return (
    <div className="spaces-list">
      <h1 className="spaces-list-title">{title}</h1>
      <div className="spaces-grid">
        {spacesArray.map((space) => {
          if (!space || !space.id) {
            console.warn("Invalid space data:", space)
            return null
          }
          return (
            <SpaceCard
              key={space.id}
              space={space}
              onClick={() => handleCardClick(space)}
            />
          )
        })}
      </div>
      {selectedSpace && (
        <div className="space-expanded-overlay" onClick={handleCloseExpanded}>
          <div className="space-expanded-content" onClick={(e) => e.stopPropagation()}>
            <button className="space-expanded-close" onClick={handleCloseExpanded}>×</button>
            <SpaceCard space={selectedSpace} isExpanded={true} />
          </div>
        </div>
      )}
    </div>
  );
}
