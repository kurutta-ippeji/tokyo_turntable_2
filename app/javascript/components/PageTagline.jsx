import React from "react";

export default function PageTagline({ category, filterType, filterValue }) {
  let text = "For those who listen";

  if (category && filterValue) {
    const separator = category === "Spaces" ? " · " : " • ";
    text = `${category}${separator}${filterValue}`;
  }

  return (
    <div className="page-tagline">
      {text}
    </div>
  );
}
