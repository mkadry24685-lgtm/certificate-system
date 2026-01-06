import React, { useState } from "react";
import "../styles/Navbar.css";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    {
      label: "عن بلدى",
      path: "https://balady.gov.sa/ar",
    },
    {
      label:"مركز المعرفة",
      path: "https://balady.gov.sa/ar",
    },
    {
      label: "الخدمات",
      path: "https://balady.gov.sa/ar",
    },
    {
      label: "الاستعلامات",
      path: "https://balady.gov.sa/ar",
    },
    {
      label: "المنصات",
      path: "https://balady.gov.sa/ar",
    },
    {
      label: "تواصل معنا",
      path: "https://balady.gov.sa/ar",
    },
  ];

  return (
    <nav className={`navbar${mobileMenuOpen ? ' navbar-mobile-open' : ''}`}>
      <div className="navbar-container">
        {/* Logo and Text - Link to balady */}
        <a 
          href="https://balady.gov.sa/ar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="navbar-logo"
        >
          <img src="/logo.svg" alt="Logo" className="logo-img" />
        </a>

        {/* Mobile Toggle Button */}
        <button className="mobile-menu-toggle" onClick={toggleMobileMenu} aria-label="فتح القائمة">
          <span className={`hamburger ${mobileMenuOpen ? "open" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Navigation Items - Simple Links */}
        <ul className={`navbar-menu ${mobileMenuOpen ? "mobile-active" : ""}`}>
          {navItems.map((item, index) => (
            <li key={index} className="navbar-item">
              <a
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="navbar-link"
              >
                {item.label}
                <span className="dropdown-arrow">▼</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

