import React from "react";

function FilterBar({ onFilter }) {
  const statuses = ["All", "Applied", "interview", "offer", "rejected"];

  return (
    <div className="d-flex justify-content-center mb-3">
      {statuses.map((status) => (
        <button
          key={status}
          className="btn btn-outline-primary mx-1"
          onClick={() => onFilter(status)}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </button>
      ))}
    </div>
  );
  
}

export default FilterBar;
