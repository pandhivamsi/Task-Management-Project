import React from 'react'
import Header from './Header'

const Dashboard = () => {
  return (
    <div>
      <Header />

      {/* Header  content area with border */}
      <div 
        style={{ 
          border: "2px",  // Border only for content area
          backgroundColor: "#f5f5f5",    // Smoke white inside border
          minHeight: "90vh",
          margin: "20px",                // gap from header
          padding: "20px"
        }}
      >
      </div>
    </div>
  )
}

export default Dashboard
