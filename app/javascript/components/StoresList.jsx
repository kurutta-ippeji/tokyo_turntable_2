import React from "react";
import StoreCard from "./StoreCard";

export default function StoresList({ stores = [] }) {
  return (
    <div className="stores-list">
      <h1 className="stores-list-title">Record Stores</h1>
      <div className="stores-grid">
        {stores.map((store) => (
          <StoreCard key={store.id} store={store} />
        ))}
      </div>
    </div>
  );
}
