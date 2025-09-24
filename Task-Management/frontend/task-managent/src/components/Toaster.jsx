import React, { useEffect, useState } from "react";

const Toaster = () => {
  const [showToast, setShowToast] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowToast(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  if (!showToast) return null;

  return (
    <div
      className="position-fixed start-50 translate-middle-x"
      style={{ top: "70px", zIndex: 1080 }}
    >
      <div
        className="toast show align-items-center text-bg-success border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ minWidth: "200px" }}
      >
        <div className="d-flex">
          <div className="toast-body">Successfully deleted</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={() => setShowToast(false)}
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default Toaster;
