import React, { useState, useEffect } from "react";
import StoreCard from "./StoreCard";

export default function StoresList({ stores = [], title = "Record Stores" }) {
  // Ensure stores is an array
  const storesArray = Array.isArray(stores) ? stores : []
  const [currentRow, setCurrentRow] = useState(0)

  const CARDS_PER_ROW = 3
  const totalRows = Math.ceil(storesArray.length / CARDS_PER_ROW)
  const startIndex = currentRow * CARDS_PER_ROW
  const endIndex = startIndex + CARDS_PER_ROW
  const currentRowStores = storesArray.slice(startIndex, endIndex)

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

  // Reset to first row when stores change
  useEffect(() => {
    setCurrentRow(0)
  }, [storesArray.length])

  if (storesArray.length === 0) {
    return (
      <div className="stores-list">
        <p className="stores-empty">No stores found.</p>
      </div>
    )
  }

  return (
    <div className="stores-list">
      <div className="stores-row-container">
        {currentRow > 0 && (
          <button
            className="stores-nav-button stores-nav-button-prev"
            onClick={handlePrevRow}
            aria-label="Previous row"
          >
            ←
          </button>
        )}
        <div className="stores-grid">
          {currentRowStores.map((store) => {
            if (!store || !store.id) {
              console.warn("Invalid store data:", store)
              return null
            }
            return (
              <StoreCard key={store.id} store={store} />
            )
          })}
        </div>
        {currentRow < totalRows - 1 && (
          <button
            className="stores-nav-button stores-nav-button-next"
            onClick={handleNextRow}
            aria-label="Next row"
          >
            →
          </button>
        )}
      </div>
      {totalRows > 1 && (
        <div className="stores-row-indicator">
          {currentRow + 1} / {totalRows}
        </div>
      )}
    </div>
  );
}
