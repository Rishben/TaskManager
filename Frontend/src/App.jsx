import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddTask from './components/AddTask'
import TaskDetails from './components/TaskDetails'

function App() {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('/');
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    setActiveRoute(location.pathname);
    setMenuOpen(false);
  }, [location]);

  // New color scheme
  const colors = {
    primary: '#6b46c1', // Purple as primary color
    secondary: '#805ad5',
    text: '#2d3748',
    lightBg: '#f7fafc',
    white: '#ffffff',
    hover: 'rgba(107, 70, 193, 0.1)'
  };

  // Media query breakpoints
  const isMobile = window.innerWidth <= 768;

  // Responsive container style
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: colors.lightBg
  };

  const navContainerStyle = {
    backgroundColor: colors.white,
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    marginBottom: '30px',
    padding: '0 20px'
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0',
    flexWrap: isMobile ? 'wrap' : 'nowrap'
  };

  const navbarBrandStyle = {
    fontSize: isMobile ? '20px' : '24px',
    fontWeight: 'bold',
    color: colors.primary,
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const brandIconStyle = {
    fontSize: '1.5rem',
    marginRight: '5px',
    color: colors.primary
  };

  const navLinksStyle = {
    display: isMobile ? (menuOpen ? 'flex' : 'none') : 'flex',
    gap: '20px',
    alignItems: 'center',
    flexDirection: isMobile ? 'column' : 'row',
    width: isMobile ? '100%' : 'auto',
    marginTop: isMobile ? '15px' : '0',
    paddingTop: isMobile ? '15px' : '0',
    borderTop: isMobile ? `1px solid ${colors.hover}` : 'none'
  };

  const navLinkStyle = (isActive) => ({
    textDecoration: 'none',
    color: isActive ? colors.primary : colors.text,
    fontWeight: isActive ? '600' : '500',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: isActive ? colors.hover : 'transparent',
    transition: 'all 0.3s ease',
    width: isMobile ? '100%' : 'auto',
    textAlign: isMobile ? 'center' : 'left'
  });

  const menuButtonStyle = {
    display: isMobile ? 'block' : 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '24px',
    color: colors.primary
  };

  const contentStyle = {
    minHeight: 'calc(100vh - 150px)'
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px 0',
    color: colors.text,
    borderTop: `1px solid ${colors.hover}`,
    fontSize: '14px'
  };

  // Function to check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return activeRoute === '/'
    }
    return activeRoute.startsWith(path);
  };

  // New Calendar icon
  const Logo = () => (
    <div style={brandIconStyle}>
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M8 14h.01"></path>
        <path d="M12 14h.01"></path>
        <path d="M16 14h.01"></path>
        <path d="M8 18h.01"></path>
        <path d="M12 18h.01"></path>
        <path d="M16 18h.01"></path>
      </svg>
    </div>
  );

  // Menu toggle icon
  const MenuIcon = () => (
    <svg 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <line x1="3" y1="12" x2="21" y2="12"></line>
      <line x1="3" y1="6" x2="21" y2="6"></line>
      <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
  );

  // Window resize event listener for responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={containerStyle}>
      <nav style={navContainerStyle}>
        <div style={navbarStyle}>
          <Link to="/" style={navbarBrandStyle}>
            <Logo />
            TaskBoard
          </Link>
          
          <button 
            style={menuButtonStyle} 
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <MenuIcon />
          </button>
          
          <div style={navLinksStyle}>
            <Link 
              to="/" 
              style={navLinkStyle(isActive('/'))}
              onMouseOver={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = colors.hover;
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Dashboard
            </Link>
            <Link 
              to="/add" 
              style={navLinkStyle(isActive('/add'))}
              onMouseOver={(e) => {
                if (!isActive('/add')) {
                  e.target.style.backgroundColor = colors.hover;
                }
              }}
              onMouseOut={(e) => {
                if (!isActive('/add')) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Add Task
            </Link>
          </div>
        </div>
      </nav>

      <main style={contentStyle}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add" element={<AddTask />} />
          <Route path="/task/:id" element={<TaskDetails />} />
        </Routes>
      </main>

      <footer style={footerStyle}>
        <p>© {new Date().getFullYear()} TaskBoard App - Your tasks organized efficiently</p>
      </footer>
    </div>
  );
}

export default App;