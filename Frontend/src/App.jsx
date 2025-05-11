import React, { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import AddTask from './components/AddTask'
import TaskDetails from './components/TaskDetails'

function App() {
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState('/');
  
  useEffect(() => {
    setActiveRoute(location.pathname);
  }, [location]);

  // Inline CSS styles
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    backgroundColor: '#f8f9fa'
  };

  const navContainerStyle = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
    marginBottom: '30px',
    padding: '0 20px'
  };

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 0'
  };

  const navbarBrandStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#4a6ee0',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  };

  const brandIconStyle = {
    fontSize: '1.5rem',
    marginRight: '5px'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '20px',
    alignItems: 'center'
  };

  const navLinkStyle = (isActive) => ({
    textDecoration: 'none',
    color: isActive ? '#4a6ee0' : '#555',
    fontWeight: isActive ? '600' : '500',
    fontSize: '16px',
    padding: '8px 12px',
    borderRadius: '4px',
    backgroundColor: isActive ? 'rgba(74, 110, 224, 0.1)' : 'transparent',
    transition: 'all 0.3s ease'
  });

  const contentStyle = {
    minHeight: 'calc(100vh - 150px)'
  };

  const footerStyle = {
    textAlign: 'center',
    marginTop: '40px',
    padding: '20px 0',
    color: '#666',
    borderTop: '1px solid #eee',
    fontSize: '14px'
  };

  // Function to check if a route is active
  const isActive = (path) => {
    if (path === '/') {
      return activeRoute === '/'
    }
    return activeRoute.startsWith(path);
  };

  // Logo as an SVG inside a div
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
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
      </svg>
    </div>
  );

  return (
    <div style={containerStyle}>
      <nav style={navContainerStyle}>
        <div style={navbarStyle}>
          <Link to="/" style={navbarBrandStyle}>
            <Logo />
            Task Manager
          </Link>
          <div style={navLinksStyle}>
            <Link 
              to="/" 
              style={navLinkStyle(isActive('/'))}
              onMouseOver={(e) => {
                if (!isActive('/')) {
                  e.target.style.backgroundColor = 'rgba(74, 110, 224, 0.05)';
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
                  e.target.style.backgroundColor = 'rgba(74, 110, 224, 0.05)';
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
        <p>© {new Date().getFullYear()} Task Manager App - Your tasks organized efficiently</p>
      </footer>
    </div>
  );
}

export default App;