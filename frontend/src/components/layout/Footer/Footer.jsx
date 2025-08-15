import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer style={{ textAlign: "center", padding: "1rem", background: "#f2f2f2" }}>
      © {currentYear} Khairul Islam. All rights reserved.
    </footer>
  )
}

export default Footer