import React, { useState, useEffect } from "react";

/**
 * PUBLIC_INTERFACE
 * Modern, playful navigation bar for FunBase:
 * - FunBase logo/title is centered and prominent ONLY on the landing page ("/").
 * - On all other pages, it's left-aligned with other nav items but always links to the landing page.
 * - All other nav items (with icons) and Settings dropdown are left-aligned.
 * - Gradient/blur, hover, responsive, and accessibility are preserved.
 */

function NavBar() {
  // Track location (naive method via window.location)
  const [isHome, setIsHome] = useState(window.location.pathname === "/" || window.location.pathname === "/index.html");

  useEffect(() => {
    // Listen for popstate for SPA navigation, fallback for reloads
    const onPop = () => setIsHome(window.location.pathname === "/" || window.location.pathname === "/index.html");
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  // Settings dropdown
  const [showSettings, setShowSettings] = useState(false);
  const [hovered, setHovered] = useState({});

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
    justifyContent: isHome ? "center" : "flex-start",
    padding: "0.25rem 1.5rem",
    fontFamily: "'Segoe UI', 'Comic Sans MS', Arial, sans-serif",
    fontWeight: 700,
    minHeight: 64,
    transition: "background 0.3s",
    boxSizing: "border-box",
  };

  const leftContainerStyle = {
    display: "flex",
    alignItems: "center"
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

  // Responsive CSS (augmented: brand centering logic)
  const responsiveStyles = `
    @media (max-width: 900px) {
      .funbase-navbar-list {
        gap: 0.5rem;
      }
      .funbase-navbar li {
        font-size: 0.96rem;
        padding: 0.18rem 0.36rem;
      }
      .funbase-navbar {
        padding-left: .19rem;
        padding-right: .29rem;
        min-height: 49px;
      }
      .funbase-navbar-brand {
        font-size: 1rem !important;
      }
    }
    @media (max-width: 700px) {
      .funbase-navbar-list {
        flex-wrap: wrap;
        gap: 0;
      }
      .funbase-navbar {
        flex-direction: column;
        align-items: flex-start !important;
      }
      .funbase-navbar-brand {
        margin: 0 !important;
        padding-right: 0;
      }
      .funbase-navbar-dropdown, .funbase-navbar-dropdown-menu {
        min-width: 122px !important;
        left: auto !important;
        right: 0 !important;
      }
      .funbase-navbar-center-logo {
        font-size: 1.17rem !important;
      }
    }
  `;

  // FunBase brand/logo style
  const brandCenter = {
    fontSize: "2.1rem",
    fontWeight: 900,
    color: "#000",
    background: "rgba(255,255,255,0.62)",
    borderRadius: 16,
    padding: "0.33rem 1.4rem",
    margin: "0 auto",
    letterSpacing: "0.23em",
    boxShadow: "0 4px 24px #add0d726",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    userSelect: "none",
    position: "relative",
    zIndex: 2,
    transition: "box-shadow 0.27s, background 0.2s"
  };

  const brandSmall = {
    fontSize: "1.23rem",
    fontWeight: 900,
    color: "#000",
    letterSpacing: "0.17em",
    marginRight: 22,
    cursor: "pointer",
    userSelect: "none",
    display: "flex",
    alignItems: "center"
  };

  // Accessibility & SPA: home navigation (simulate or link)
  const handleLogoClick = (e) => {
    if (!isHome) {
      e.preventDefault();
      window.history.pushState({}, "", "/");
      setIsHome(true);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
    // else just let go, landing scroll to top/refresh
  };

  // Settings dropdown a11y
  const handleBlurDropdown = () => {
    setTimeout(() => setShowSettings(false), 130);
  };

  // All Nav Links (excluding Logo)
  const navLinks = [
    {
      icon: "💬",
      label: "Quotes",
      href: "/quotes",
      name: "quotes",
    },
    {
      icon: "😂",
      label: "Memes",
      href: "/memes",
      name: "memes",
    },
    {
      icon: "🎬",
      label: "Movies",
      href: "/movies",
      name: "movies",
    },
    {
      icon: "🔥",
      label: "Trending Fun",
      href: "/trending",
      name: "trending",
    },
  ];

  // Render
  return (
    <nav className="funbase-navbar" style={navStyle}>
      <style>{responsiveStyles}</style>
      {isHome ? (
        // Centered FunBase logo/title on landing
        <div
          className="funbase-navbar-center-logo"
          style={brandCenter}
          tabIndex={0}
          role="button"
          aria-label="FunBase Home"
          onClick={handleLogoClick}
          onKeyPress={e => (e.key === "Enter" ? handleLogoClick(e) : null)}
        >
          <span aria-label="FunBase" role="img" style={{ fontSize: "2.4rem", marginRight: 16 }}>
            🎉
          </span>
          FunBase
        </div>
      ) : (
        // Left-aligned: brand (always returns home), then nav items, then dropdown
        <div style={leftContainerStyle}>
          <a
            href="/"
            className="funbase-navbar-brand"
            style={brandSmall}
            tabIndex={0}
            aria-label="Go to FunBase Home"
            onClick={handleLogoClick}
          >
            <span aria-label="FunBase" role="img" style={{ fontSize: "1.5rem", marginRight: 7 }}>
              🎉
            </span>
            FunBase
          </a>
          <ul className="funbase-navbar-list" style={navListStyle}>
            {navLinks.map(nav => (
              <li key={nav.name}>
                <a
                  href={nav.href}
                  style={
                    hovered[nav.name]
                      ? { ...linkStyle, ...linkHoverStyle }
                      : linkStyle
                  }
                  className="funbase-navbar-link"
                  onMouseEnter={() => setHovered((h) => ({ ...h, [nav.name]: true }))}
                  onMouseLeave={() => setHovered((h) => ({ ...h, [nav.name]: false }))}
                  aria-label={nav.label}
                >
                  <span role="img" aria-label={nav.label} style={{ marginRight: 7 }}>
                    {nav.icon}
                  </span>
                  {nav.label}
                </a>
              </li>
            ))}
            {/* Settings dropdown */}
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
                onMouseEnter={() => setHovered((h) => ({ ...h, settings: true }))}
                onMouseLeave={() => setHovered((h) => ({ ...h, settings: false }))}
                aria-label="Settings"
              >
                <span role="img" aria-label="Settings" style={{ marginRight: 7 }}>⚙️</span>
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
        </div>
      )}
    </nav>
  );
}

export default NavBar;
