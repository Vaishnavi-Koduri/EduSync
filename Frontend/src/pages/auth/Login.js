// import React, { useState } from 'react';
// // import { useAuth } from './AuthContext';
// import { useAuth } from '../../contexts/AuthContext'; // ✅ correct
// import { useNavigate } from 'react-router-dom';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
  
//   const { login, error } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage('');
    
//     try {
//       const result = await login(email, password);
//       if (result.success) {
//         navigate('/dashboard'); // Redirect to dashboard after successful login
//       } else {
//         setErrorMessage(result.message);
//       }
//     } catch (err) {
//       setErrorMessage('An unexpected error occurred. Please try again later.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login to EduSync</h2>
      
//       {(errorMessage || error) && (
//         <div className="error-message">
//           {errorMessage || error}
//         </div>
//       )}
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
        
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
      
//       <div className="register-link">
//         Don't have an account? <a href="/register">Register</a>
//       </div>
//     </div>
//   );
// }

// export default Login;




// import React, { useState } from 'react';
// import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// // Static credentials for demonstration/testing
// const STATIC_CREDENTIALS = [
//   { email: 'student@example.com', password: 'password123', role: 'student', name: 'John Student' },
//   { email: 'instructor@example.com', password: 'password123', role: 'instructor', name: 'Jane Instructor' },
//   { email: 'admin@example.com', password: 'password123', role: 'admin', name: 'Admin User' }
// ];

// const LoginPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     // Find user in static credentials
//     const user = STATIC_CREDENTIALS.find(
//       user => user.email === email && user.password === password
//     );

//     if (user) {
//       // Login successful
//       login({
//         email: user.email,
//         name: user.name,
//         role: user.role,
//         notifications: Math.floor(Math.random() * 5) // Random notifications for demo
//       });

//       // Redirect based on role
//       if (user.role === 'student') {
//         navigate('/dashboard');
//       } else if (user.role === 'instructor') {
//         navigate('/instructor/dashboard');
//       } else if (user.role === 'admin') {
//         navigate('/admin/dashboard');
//       }
//     } else {
//       // Login failed
//       setError('Invalid email or password');
//       setLoading(false);
//     }
//   };

//   return (
//     <Container className="py-5">
//       <Row className="justify-content-center">
//         <Col md={6}>
//           <Card className="shadow">
//             <Card.Body className="p-4">
//               <h2 className="text-center mb-4">Sign In to EduSync</h2>
              
//               {error && <Alert variant="danger">{error}</Alert>}
              
//               <Form onSubmit={handleSubmit}>
//                 <Form.Group className="mb-3" controlId="formEmail">
//                   <Form.Label>Email Address</Form.Label>
//                   <Form.Control 
//                     type="email" 
//                     placeholder="Enter your email" 
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Form.Group className="mb-4" controlId="formPassword">
//                   <Form.Label>Password</Form.Label>
//                   <Form.Control 
//                     type="password" 
//                     placeholder="Enter your password" 
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </Form.Group>

//                 <Button 
//                   variant="primary" 
//                   type="submit" 
//                   className="w-100 py-2"
//                   disabled={loading}
//                 >
//                   {loading ? 'Signing in...' : 'Sign In'}
//                 </Button>
//               </Form>
              
//               <div className="text-center mt-3">
//                 <a href="/forgot-password" className="text-decoration-none">Forgot password?</a>
//               </div>
              
//               <hr className="my-4" />
              
//               <div className="text-center">
//                 <p className="mb-0">Don't have an account? <a href="/register" className="text-decoration-none">Register</a></p>
//               </div>
              
//               {/* Demo account information */}
//               <div className="mt-4 p-3 bg-light rounded">
//                 <h6 className="text-center mb-3">Demo Accounts</h6>
//                 <div className="small">
//                   <p className="mb-1"><strong>Student:</strong> student@example.com / password123</p>
//                   <p className="mb-1"><strong>Instructor:</strong> instructor@example.com / password123</p>
//                   <p className="mb-0"><strong>Admin:</strong> admin@example.com / password123</p>
//                 </div>
//               </div>
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default LoginPage;

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');

    try {
      const result = await login(email, password);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(result.message || 'Invalid credentials.');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div className="container">
          <a className="navbar-brand" href="/">Welcome to EduSync !!</a>
          {/* <div className="ms-auto">
            <a className="btn btn-outline-primary me-2" href="/login">Login</a>
            <a className="btn btn-primary" href="/register">Register</a>
          </div> */}
        </div>
      </nav>

      {/* Main Login Section */}
      <main className="flex-fill d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-sm p-4" style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}>
          <h4 className="mb-3 text-center">Login to EduSync</h4>

          {(errorMessage || error) && (
            <div className="alert alert-danger">{errorMessage || error}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Don't have an account? <a href="/register">Register here</a>
            </small>
          </div>
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="bg-dark text-light text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} EduSync. All rights reserved.
      </footer> */}
    </div>
  );
}

export default Login;
