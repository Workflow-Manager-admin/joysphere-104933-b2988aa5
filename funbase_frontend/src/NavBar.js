import React, { useState } from "react";

// PUBLIC_INTERFACE
function NavBar({ onThemeToggle, theme }) {
  /**
   * Modern, playful navigation bar for FunBase with emoji icons, gradient/blurred background,
   * dropdowns, and responsive, interactive styling as specified in requirements.
   * 
   * Props:
   *   onThemeToggle (function): callback to toggle light/dark theme
   *   theme (string): current theme name ("light" or "dark")
   */
  const [showContact, setShowContact] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    const d = new Date();
    return d.toISOString().split("T")[0];
  });

  // Handlers for toggling dropdowns
  const toggleContact = () => setShowContact((show) => !show);
  const toggleSettings = () => setShowSettings((show) => !show);
  const toggleDateDropdown = () => setShowDateDropdown((show) => !show);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setShowDateDropdown(false);
  };

  // For "Surprise Me" button - just a placeholder click handler
  const handleSurpriseMe = () => {
    alert("🎲 Surprise! (This button will bring fun surprises in the full app!)");
  };

  // Styles (playful, light, with blur and gradient, some accent on hover)
  // Palette: #add0d7 (primary), #c4b35f (secondary), #000 (accent)
  const navStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
    background: "linear-gradient(90deg, #add0d7 60%, #c4b35f 100%)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    backdropFilter: "blur(8px)", // for nice blur effect
    WebkitBackdropFilter: "blur(8px)",
    borderBottom: "2px solid #c4b35f22",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.25rem 1.5rem",
    fontFamily: "'Segoe UI', 'Comic Sans MS', Arial, sans-serif",
    fontWeight: 700,
    minHeight: 64,
    transition: "background 0.3s",
    boxSizing: "border-box"
  };

  const navListStyle = {
    display: "flex",
    alignItems: "center",
    gap: "1.1rem",
    margin: 0,
    padding: 0,
    listStyle: "none",
    flex: 1,
  };

  const linkStyle = {
    display: "flex",
    alignItems: "center",
    color: "#000",
    textDecoration: "none",
    fontSize: "1.13rem",
    letterSpacing: "0.025em",
    borderRadius: 10,
    padding: "0.5rem 1rem",
    cursor: "pointer",
    transition: "background 0.2s, box-shadow 0.2s, color 0.15s",
    background: "transparent"
  };

  const linkHoverStyle = {
    background: "#ffffffbb",
    boxShadow: "0 2px 10px #add0d744",
    color: "#c4b35f"
  };

  const dropdownStyle = {
    position: "absolute",
    top: 50,
    left: 0,
    minWidth: 180,
    background: "#ffffffee",
    borderRadius: 12,
    boxShadow: "0 10px 24px #add0d74c",
    padding: ".7em 0",
    fontWeight: 500,
    color: "#000",
    display: "flex",
    flexDirection: "column",
    gap: 0,
    marginTop: "4px"
  };

  const dropdownItemStyle = {
    padding: ".7em 1.5em",
    cursor: "pointer",
    border: "none",
    background: "transparent",
    fontSize: "1rem",
    borderRadius: 6,
    textAlign: "left"
  };

  const dropdownItemHover = {
    background: "#add0d7",
    color: "#000",
    fontWeight: "bold"
  };

  const specialButtonStyle = {
    ...linkStyle,
    background: "#add0d7",
    color: "#000",
    fontWeight: 800,
    border: "2px solid #c4b35f77",
    boxShadow: "0 2px 8px #c4b35f33",
    fontSize: "1.31rem",
    transition: "transform 0.12s, box-shadow 0.2s",
    marginLeft: 8
  };

  // Responsive hamburger for mobile (not implemented fully, navigation remains visible for simplicity)
  const responsiveStyles = `
    @media (max-width: 800px) {
      .funbase-navbar-list {
        gap: 0.25rem;
      }
      .funbase-navbar-surprise {
        font-size: 1.03rem;
        padding: 0.31rem 0.67rem;
      }
      .funbase-navbar li {
        font-size: 0.98rem;
        padding: 0.23rem 0.47rem;
      }
      .funbase-navbar {
        padding-left: .2rem;
        padding-right: .3rem;
        min-height: 52px;
      }
      .funbase-navbar-brand {
        font-size: 1.1rem;
      }
    }
    @media (max-width: 600px) {
      .funbase-navbar-list {
        flex-wrap: wrap;
        gap: 0;
      }
      .funbase-navbar {
        flex-direction: column;
        align-items: flex-start;
      }
      .funbase-navbar-brand {
        padding-right: 0;
      }
      .funbase-navbar-dropdown, .funbase-navbar-dropdown-menu {
        min-width: 122px !important;
        left: auto !important;
        right: 0 !important;
      }
    }
  `;

  // Utility state for hover effect
  const [hovered, setHovered] = useState({});

  // Toggle focus/blur for keyboard nav dropdown closing
  const handleBlurDropdown = (dropdown) => {
    setTimeout(() => {
      if (dropdown === "contact") setShowContact(false);
      else if (dropdown === "settings") setShowSettings(false);
      else if (dropdown === "date") setShowDateDropdown(false);
    }, 130);
  };

  // Nav brand
  const brandStyle = {
    fontSize: "1.4rem",
    fontWeight: "900",
    color: "#000",
    display: "flex",
    alignItems: "center",
    letterSpacing: "0.17em",
    marginRight: 22,
    cursor: "pointer",
    userSelect: "none"
  };

  // Accessibility: aria-label where appropriate; tabIndex for dropdown
  return (
    <nav className="funbase-navbar" style={navStyle}>
      <style>{responsiveStyles}</style>
      <div className="funbase-navbar-brand" style={brandStyle}>
        <span aria-label="FunBase" role="img" style={{fontSize: "1.8rem", marginRight: 9}}>🎉</span>
        FunBase
      </div>
      <ul className="funbase-navbar-list" style={navListStyle}>
        {/* Home */}
        <li>
          <a
            href="/"
            style={
              hovered.home
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            className="funbase-navbar-link"
            onMouseEnter={() => setHovered({ ...hovered, home: true })}
            onMouseLeave={() => setHovered({ ...hovered, home: false })}
            aria-label="Home"
          >
            <span role="img" aria-label="Home" style={{marginRight: 7}}>🏠</span>
            Home
          </a>
        </li>
        {/* Quotes */}
        <li>
          <a
            href="/quotes"
            style={
              hovered.quotes
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            className="funbase-navbar-link"
            onMouseEnter={() => setHovered({ ...hovered, quotes: true })}
            onMouseLeave={() => setHovered({ ...hovered, quotes: false })}
            aria-label="Quotes"
          >
            <span role="img" aria-label="Quotes" style={{marginRight: 7}}>💬</span>
            Quotes
          </a>
        </li>
        {/* Memes */}
        <li>
          <a
            href="/memes"
            style={
              hovered.memes
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            className="funbase-navbar-link"
            onMouseEnter={() => setHovered({ ...hovered, memes: true })}
            onMouseLeave={() => setHovered({ ...hovered, memes: false })}
            aria-label="Memes"
          >
            <span role="img" aria-label="Memes" style={{marginRight: 7}}>😂</span>
            Memes
          </a>
        </li>
        {/* Movies */}
        <li>
          <a
            href="/movies"
            style={
              hovered.movies
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            className="funbase-navbar-link"
            onMouseEnter={() => setHovered({ ...hovered, movies: true })}
            onMouseLeave={() => setHovered({ ...hovered, movies: false })}
            aria-label="Movies"
          >
            <span role="img" aria-label="Movies" style={{marginRight: 7}}>🎬</span>
            Movies
          </a>
        </li>
        {/* Trending Fun with date selector */}
        <li style={{ position: "relative" }}>
          <div
            className="funbase-navbar-dropdown"
            style={
              hovered.trending
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            tabIndex={0}
            onClick={toggleDateDropdown}
            onBlur={() => handleBlurDropdown("date")}
            onMouseEnter={() => setHovered({ ...hovered, trending: true })}
            onMouseLeave={() => setHovered({ ...hovered, trending: false })}
            aria-label="Trending Fun"
          >
            <span role="img" aria-label="Trending Fun" style={{marginRight: 7}}>📅</span>
            Trending Fun
            <span style={{ fontSize: "0.87em", marginLeft: 7, color: "#c4b35f" }}>▼</span>
            <span style={{
              fontSize: "0.85em",
              marginLeft: 9,
              fontWeight: 500,
              background: "#c4b35f22",
              borderRadius: 6,
              padding: "0.15em 0.6em"
            }}>{selectedDate}</span>
          </div>
          {showDateDropdown && (
            <div
              className="funbase-navbar-dropdown-menu"
              style={{ ...dropdownStyle, left: 0, minWidth: 170 }}
              onMouseLeave={toggleDateDropdown}
            >
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                style={{
                  ...dropdownItemStyle,
                  margin: "4px 12px",
                  borderRadius: 6,
                  border: "1px solid #add0d7",
                  fontSize: "1rem",
                  background: "#f8fbfc"
                }}
                min="2015-01-01"
                max={new Date().toISOString().split("T")[0]}
                aria-label="Pick a Date for Trending Fun"
              />
            </div>
          )}
        </li>
        {/* Surprise Me */}
        <li>
          <button
            className="funbase-navbar-surprise"
            style={
              hovered.surprise
                ? { ...specialButtonStyle, ...linkHoverStyle }
                : specialButtonStyle
            }
            onMouseEnter={() => setHovered({ ...hovered, surprise: true })}
            onMouseLeave={() => setHovered({ ...hovered, surprise: false })}
            onClick={handleSurpriseMe}
            aria-label="Surprise Me"
          >
            <span role="img" aria-label="Surprise" style={{marginRight: 7}}>🎲</span>
            Surprise Me
          </button>
        </li>
        {/* Contact/About Dropdown */}
        <li style={{ position: "relative" }}>
          <div
            className="funbase-navbar-dropdown"
            style={
              hovered.contact
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            tabIndex={0}
            onClick={toggleContact}
            onBlur={() => handleBlurDropdown("contact")}
            onMouseEnter={() => setHovered({ ...hovered, contact: true })}
            onMouseLeave={() => setHovered({ ...hovered, contact: false })}
            aria-label="Contact or About"
          >
            <span role="img" aria-label="About/Contact" style={{marginRight: 7}}>📞</span>
            Contact/About
            <span style={{ fontSize: "0.87em", marginLeft: 7, color: "#c4b35f" }}>▼</span>
          </div>
          {showContact && (
            <div
              className="funbase-navbar-dropdown-menu"
              style={{ ...dropdownStyle, left: 0 }}
              onMouseLeave={toggleContact}
            >
              <a
                href="/about"
                style={dropdownItemStyle}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
              >
                About Us
              </a>
              <a
                href="/contact"
                style={dropdownItemStyle}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
              >
                Contact
              </a>
              <a
                href="/feedback"
                style={dropdownItemStyle}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
              >
                Feedback
              </a>
            </div>
          )}
        </li>
        {/* Settings Dropdown */}
        <li style={{ position: "relative" }}>
          <div
            className="funbase-navbar-dropdown"
            style={
              hovered.settings
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            tabIndex={0}
            onClick={toggleSettings}
            onBlur={() => handleBlurDropdown("settings")}
            onMouseEnter={() => setHovered({ ...hovered, settings: true })}
            onMouseLeave={() => setHovered({ ...hovered, settings: false })}
            aria-label="Settings"
          >
            <span role="img" aria-label="Settings" style={{marginRight: 7}}>⚙️</span>
            Settings
            <span style={{ fontSize: "0.87em", marginLeft: 7, color: "#c4b35f" }}>▼</span>
          </div>
          {showSettings && (
            <div
              className="funbase-navbar-dropdown-menu"
              style={{ ...dropdownStyle, left: 0 }}
              onMouseLeave={toggleSettings}
            >
              <button
                style={{
                  ...dropdownItemStyle,
                  display: "flex",
                  alignItems: "center",
                  border: "none",
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
                onClick={() => {
                  onThemeToggle && onThemeToggle();
                  setShowSettings(false);
                }}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
                aria-label="Toggle Theme"
              >
                {theme === "light" ? "🌙" : "☀️"} Theme: {theme === "light" ? "Dark" : "Light"}
              </button>
              <a
                href="/help"
                style={dropdownItemStyle}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
              >
                FAQ / Help
              </a>
              <a
                href="/feedback"
                style={dropdownItemStyle}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
              >
                Feedback
              </a>
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

/** NavBar is the main navigation component, see file header for details */
export default NavBar;
