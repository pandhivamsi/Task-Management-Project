import React, { useEffect } from "react";
import { FaPeopleLine } from "react-icons/fa6";

const StandupWizard = ({ setIsFullscreen }) => {
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [setIsFullscreen]);

  return (
    <div className="d-flex align-items-center ">
      <button
        className="btn border rounded-pill d-flex shadow-sm text-dark bg-white w-100 fs-6 mt-3 align-items-center px-0 ps-2 pe-2 me-2"
        onClick={toggleFullScreen}
      >
        <FaPeopleLine className="me-2" /> Standup_Wizard
      </button>
    </div>
  );
};

export default StandupWizard;
