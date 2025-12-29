import React from "react";
import StoreCard from "./StoreCard";

export default function StoresList({ stores = [], title = "Record Stores" }) {
  // Ensure stores is an array
  const storesArray = Array.isArray(stores) ? stores : []

  if (storesArray.length === 0) {
    return (
      <div className="stores-list">
        <h1 className="stores-list-title">{title}</h1>
        <p className="stores-empty">No stores found.</p>
      </div>
    )
  }

  return (
    <div className="stores-list">
      <h1 className="stores-list-title">{title}</h1>
      <div className="stores-grid">
        {storesArray.map((store) => {
          if (!store || !store.id) {
            console.warn("Invalid store data:", store)
            return null
          }
          return (
            <StoreCard key={store.id} store={store} />
          )
        })}
      </div>
    </div>
  );
}
