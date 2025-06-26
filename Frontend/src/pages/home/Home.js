import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      {/* <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4" href="/">EduSync</a>
          <div className="ms-auto">
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-primary" to="/register">Register</Link>
          </div>
        </div>
      </nav> */}

      {/* Hero Section */}
      <header className="flex-fill bg-light d-flex align-items-center py-5">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Welcome to EduSync</h1>
          <p className="lead text-muted mt-3">
            Streamline your learning experience with modern tools for students, instructors, and admins.
          </p>
          <div className="mt-4">
            <Link to="/register" className="btn btn-primary btn-lg me-2">Get Started</Link>
            <Link to="/login" className="btn btn-outline-secondary btn-lg">Login</Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="mb-4 fw-semibold">Why Choose EduSync?</h2>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h5>Seamless Dashboard</h5>
                <p className="text-muted">Personalized dashboards for students, instructors, and admins.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h5>Interactive Assessments</h5>
                <p className="text-muted">Create, assign, and evaluate quizzes and assignments effortlessly.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <h5>Real-time Insights</h5>
                <p className="text-muted">Track performance and progress with real-time analytics.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-dark text-light text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} EduSync. All rights reserved.
      </footer> */}
    </div>
  );
}

export default Home;
