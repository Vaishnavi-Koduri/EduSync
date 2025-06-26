import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4" style={{ 
      width: '100%',
    }}>
      <Container className="w-75"> {/* Reduced width to 75% */}
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>About EduSync</h5>
            <p className="text-white"> {/* Changed from text-muted to text-white */}
              EduSync is a modern Learning Management System designed to provide 
              seamless educational experiences for students and instructors.
            </p>
          </Col>
          
          <Col md={2} className="mb-4 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li> {/* Changed from a tag to Link and text-muted to text-white */}
              <li><Link to="/courses" className="text-white">Courses</Link></li>
              <li><Link to="/about" className="text-white">About Us</Link></li>
              <li><Link to="/contact" className="text-white">Contact</Link></li>
            </ul>
          </Col>
          
          <Col md={3} className="mb-4 mb-md-0">
            <h5>Legal</h5>
            <ul className="list-unstyled">
              <li><Link to="/privacy" className="text-white">Privacy Policy</Link></li> {/* Changed from a tag to Link and text-muted to text-white */}
              <li><Link to="/terms" className="text-white">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-white">Cookie Policy</Link></li>
            </ul>
          </Col>
          
          <Col md={3}>
            <h5>Connect With Us</h5>
            <div className="social-links">
              <a href="https://facebook.com" className="text-white me-2"> {/* Changed from text-muted to text-white */}
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://twitter.com" className="text-white me-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://linkedin.com" className="text-white me-2">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="https://instagram.com" className="text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
            <div className="mt-3">
              <p className="text-white mb-1"> {/* Changed from text-muted to text-white */}
                <i className="fas fa-envelope me-2"></i> support@edusync.com
              </p>
            </div>
          </Col>
        </Row>
        
        <hr className="mt-4 mb-3" />
        
        <Row>
          <Col className="text-center">
            <p className="text-white mb-0"> {/* Changed from text-muted to text-white */}
              &copy; {new Date().getFullYear()} EduSync LMS. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;