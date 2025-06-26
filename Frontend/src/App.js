import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import StudentDashboard from './pages/student/Dashboard';
import InstructorDashboard from './pages/instructor/Dashboard';
import CourseCreation from './pages/instructor/CourseCreation';
import PrivateRoute from './components/common/PrivateRoute';
import RoleRoute from './components/common/RoleRoute';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/home/Home';
import './App.css'; 
import UpdateCourse from './pages/instructor/UpdateCourse';

function App() {
  return (
    <AuthProvider>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Container>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Student Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['student']}>
                    <StudentDashboard />
                  </RoleRoute>
                </PrivateRoute>
              } />

              {/* Instructor Routes */}
              <Route path="/instructor/dashboard" element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['instructor']}>
                    <InstructorDashboard />
                  </RoleRoute>
                </PrivateRoute>
              } />
              <Route path="/instructor/courses/new" element={
                <PrivateRoute>
                  <RoleRoute allowedRoles={['instructor']}>
                    <CourseCreation />
                  </RoleRoute>
                </PrivateRoute>
              } />
              <Route path="/instructor/courses/update/:courseId" element={
              <PrivateRoute>
                <RoleRoute allowedRoles={['instructor']}>
                  <UpdateCourse />
                </RoleRoute>
              </PrivateRoute>
            } />
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
