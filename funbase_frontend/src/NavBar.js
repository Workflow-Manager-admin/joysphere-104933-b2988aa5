import React, { useState } from "react";

// PUBLIC_INTERFACE
function NavBar() {
  /**
   * Modern, playful navigation bar for FunBase with emoji icons, gradient/blurred background,
   * single Settings dropdown, and responsive, interactive styling.
   *
   * - Contact, About, Feedback, and Help/FAQ are now all under the Settings (⚙️) dropdown.
   * - Dark mode/theme toggle control has been removed as per requirements.
   */

  // Dropdown visibility state
  const [showSettings, setShowSettings] = useState(false);

  // Styles
  const navStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 100,
    background: "linear-gradient(90deg, #add0d7 60%, #c4b35f 100%)",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    backdropFilter: "blur(8px)",
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
    minWidth: 185,
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

  // Responsive CSS
  const responsiveStyles = `
    @media (max-width: 800px) {
      .funbase-navbar-list {
        gap: 0.25rem;
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

  // Hover effect utility
  const [hovered, setHovered] = useState({});

  // Toggle dropdown close on blur for a11y
  const handleBlurDropdown = () => {
    setTimeout(() => setShowSettings(false), 130);
  };

  // Nav brand style
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

  return (
    <nav className="funbase-navbar" style={navStyle}>
      <style>{responsiveStyles}</style>
      <div className="funbase-navbar-brand" style={brandStyle}>
        <span aria-label="FunBase" role="img" style={{fontSize: "1.8rem", marginRight: 9}}>🎉</span>
        FunBase
      </div>
      <ul className="funbase-navbar-list" style={navListStyle}>
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
        {/* Trending Fun (simplified, no date) */}
        <li>
          <a
            href="/trending"
            style={
              hovered.trending
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            className="funbase-navbar-link"
            onMouseEnter={() => setHovered({ ...hovered, trending: true })}
            onMouseLeave={() => setHovered({ ...hovered, trending: false })}
            aria-label="Trending Fun"
          >
            <span role="img" aria-label="Trending Fun" style={{marginRight: 7}}>🔥</span>
            Trending Fun
          </a>
        </li>
        {/* Single Settings Dropdown */}
        <li style={{ position: "relative" }}>
          <div
            className="funbase-navbar-dropdown"
            style={
              hovered.settings
                ? { ...linkStyle, ...linkHoverStyle }
                : linkStyle
            }
            tabIndex={0}
            onClick={() => setShowSettings((show) => !show)}
            onBlur={handleBlurDropdown}
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
              onMouseLeave={() => setShowSettings(false)}
            >
              <a
                href="/help"
                style={dropdownItemStyle}
                onMouseOver={e => (e.target.style.background = "#add0d7")}
                onMouseOut={e => (e.target.style.background = "transparent")}
              >
                FAQ / Help
              </a>
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
      </ul>
    </nav>
  );
}

/** NavBar is the main navigation component, see file header for details */
export default NavBar;
