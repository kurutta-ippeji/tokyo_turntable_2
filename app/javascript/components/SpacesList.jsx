import React, { useState, useEffect } from "react";
import SpaceCard from "./SpaceCard";
import { expandedState } from "./expandedState";

export default function SpacesList({ spaces = [], title = "Listening Spaces" }) {
  // Ensure spaces is an array
  const spacesArray = Array.isArray(spaces) ? spaces : []
  const [selectedSpace, setSelectedSpace] = useState(null)
  const [currentRow, setCurrentRow] = useState(0)

  const CARDS_PER_ROW = 3
  const totalRows = Math.ceil(spacesArray.length / CARDS_PER_ROW)
  const startIndex = currentRow * CARDS_PER_ROW
  const endIndex = startIndex + CARDS_PER_ROW
  const currentRowSpaces = spacesArray.slice(startIndex, endIndex)

  const handleCardClick = (space) => {
    setSelectedSpace(space)
    expandedState.setIsExpanded(true)
  }

  const handleCloseExpanded = () => {
    setSelectedSpace(null)
    expandedState.setIsExpanded(false)
  }

  const handleNextRow = () => {
    if (currentRow < totalRows - 1) {
      setCurrentRow(currentRow + 1)
    }
  }

  const handlePrevRow = () => {
    if (currentRow > 0) {
      setCurrentRow(currentRow - 1)
    }
  }

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (selectedSpace) {
        expandedState.setIsExpanded(false)
      }
    }
  }, [selectedSpace])

  // Reset to first row when spaces change
  useEffect(() => {
    setCurrentRow(0)
  }, [spacesArray.length])

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
      <div className="spaces-row-container">
        {currentRow > 0 && (
          <button
            className="spaces-nav-button spaces-nav-button-prev"
            onClick={handlePrevRow}
            aria-label="Previous row"
          >
            ←
          </button>
        )}
        <div className="spaces-grid">
          {currentRowSpaces.map((space) => {
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
        {currentRow < totalRows - 1 && (
          <button
            className="spaces-nav-button spaces-nav-button-next"
            onClick={handleNextRow}
            aria-label="Next row"
          >
            →
          </button>
        )}
      </div>
      {totalRows > 1 && (
        <div className="spaces-row-indicator">
          {currentRow + 1} / {totalRows}
        </div>
      )}
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
