import React from "react";

const AppliedFilters = ({ appliedFiltersList, onClear }) => {
  if (!appliedFiltersList || appliedFiltersList.length === 0) return null;

  return (
    <div
      className="d-flex align-items-center border rounded-pill px-2 bg-light ms-2 mt-1"
      style={{
        maxWidth: "420px",
        overflowX: "auto",
        whiteSpace: "nowrap",
        scrollbarWidth: "none",
      }}
      onWheel={(e) => {
        e.currentTarget.scrollLeft += e.deltaY;
      }}
    >
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>

      <span className="small text-muted flex-grow-1 m-2">
        Filter: {appliedFiltersList.join(", ")}
      </span>

      <button
        className="btn-close btn-sm flex-shrink-0"
        aria-label="Clear filters"
        onClick={onClear}
      ></button>
    </div>
  );
};

export default AppliedFilters;
