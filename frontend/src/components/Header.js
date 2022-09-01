import React from 'react'
import "./header.scss";

function header() {
  return (
    <header>
      <div className="logo">
        <img src="/logo.png" alt="logo" />
      </div>

      <h1 className="course-name">Complete Web & Mobile Designer in 2022: UI/UX, Figma, +more</h1>
    </header>
  )
}

export default header