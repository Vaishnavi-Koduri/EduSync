import React from 'react';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // For debugging, let's try using regular Link first
  return (
    <header>
      <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Replace LinkContainer with Link temporarily */}
          <Navbar.Brand as={Link} to="/">
            EduSync
          </Navbar.Brand>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {currentUser ? (
                <>
                  {currentUser.role === 'student' && (
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  )}
                  
                  {currentUser.role === 'instructor' && (
                    <Nav.Link as={Link} to="/instructor/dashboard">Instructor Dashboard</Nav.Link>
                  )}
                  
                  {currentUser.role === 'admin' && (
                    <Nav.Link as={Link} to="/admin/dashboard">Admin Dashboard</Nav.Link>
                  )}
                  
                  <NavDropdown title={
                    <span>
                      <i className="fas fa-user me-1"></i>
                      {currentUser.name}
                      {currentUser.notifications > 0 && (
                        <Badge pill bg="danger" className="ms-1">
                          {currentUser.notifications}
                        </Badge>
                      )}
                    </span>
                  } id="username">
                    <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/notifications">
                      Notifications
                      {currentUser.notifications > 0 && (
                        <Badge pill bg="danger" className="ms-2">
                          {currentUser.notifications}
                        </Badge>
                      )}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login">
                    <i className="fas fa-user me-1"></i>Sign In
                  </Nav.Link>
                  <Nav.Link as={Link} to="/register">
                    <i className="fas fa-user-plus me-1"></i>Register
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;