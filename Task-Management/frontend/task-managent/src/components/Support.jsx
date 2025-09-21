import React from 'react'
import Header from './Header'
import { InlineWidget } from "react-calendly";
import { useNavigate } from 'react-router-dom';

const Support = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header/>
      <div
        className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      >
        <div className="bg-white rounded p-3 shadow-lg w-75" style={{ maxWidth: "800px" }}>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0 text-dark">Schedule Support Call</h5>
            <button onClick={() => navigate("/dashboard")}
              className="btn-close">
              </button>
          </div>
          <InlineWidget
            url="https://calendly.com/chandu1718ch/30min"
            styles={{ height: "400px" }}
          />
        </div>
      </div>
    </div>
  )
}

export default Support