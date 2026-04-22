import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="famelyn-header">
      <div className="header-container">

        {/* LOGO */}
        <Link to="/" className="logo-link">
          <div className="logo">
            FAMELYN<span className="logo-dot">.</span>
          </div>
        </Link>

        {/* NAV LINKS */}
        <nav className="nav-links">
          <Link to="/books" className="nav-item">Books</Link>
          <Link to="/blogs" className="nav-item">Blogs</Link>
        </nav>

        {/* CTA BUTTON */}
        <Link to="/consultation">
          <button className="consultation-btn">
            Private Consultation
          </button>
        </Link>

      </div>
    </header>
  );
};

export default Header;