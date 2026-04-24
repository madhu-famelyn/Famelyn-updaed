import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleConsultationClick = (e) => {
    e.preventDefault();
    // Close menu if open
    setMenuOpen(false);
    // Scroll to inner circle section
    const innerCircleElement = document.getElementById("inner-circle");
    if (innerCircleElement) {
      innerCircleElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="famelyn-header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo-link">
          <div className="logo">
            FAMELYN<span className="logo-dot">.</span>
          </div>
        </Link>

        {/* NAV LINKS - Desktop */}
        <nav className="nav-links">
          <Link to="/books" className="nav-item">Books</Link>
          <Link to="/blogs" className="nav-item">Blogs</Link>
        </nav>

        {/* CTA BUTTON - Desktop */}
        <button 
          className="consultation-btn"
          onClick={handleConsultationClick}
        >
          Private Consultation
        </button>

        {/* HAMBURGER MENU */}
        <button 
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* MOBILE SIDEBAR */}
      <nav className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>
        <Link to="/books" className="sidebar-item" onClick={handleMenuItemClick}>
          Books
        </Link>
        <Link to="/blogs" className="sidebar-item" onClick={handleMenuItemClick}>
          Blogs
        </Link>
        <button 
          className="sidebar-consultation-btn"
          onClick={handleConsultationClick}
        >
          Private Consultation
        </button>
      </nav>
    </header>
  );
};

export default Header;