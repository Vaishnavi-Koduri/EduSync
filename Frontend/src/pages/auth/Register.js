import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Student'); // Default role
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const result = await register(email, password, role); // Pass role to backend
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(result.message || 'Registration failed.');
      }
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-fill d-flex align-items-center justify-content-center bg-light">
        <div className="card shadow-sm p-4" style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}>
          <h4 className="mb-3 text-center">Create an Account</h4>

          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
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

            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="role" className="form-label">Register as</label>
              <select
                className="form-select"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Student">Student</option>
                <option value="Instructor">Instructor</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
              {isLoading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="text-center mt-3">
            <small>
              Already have an account? <a href="/login">Login here</a>
            </small>
          </div>
        </div>
      </main>

      <footer className="bg-dark text-light text-center py-3 mt-auto">
        &copy; {new Date().getFullYear()} EduSync. All rights reserved.
      </footer>
    </div>
  );
}

export default Register;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../../contexts/AuthContext';

// function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const { register } = useAuth(); // Assumes you have a `register` function in your context
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrorMessage('');

//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const result = await register(email, password);
//       if (result.success) {
//         navigate('/dashboard');
//       } else {
//         setErrorMessage(result.message || 'Registration failed.');
//       }
//     } catch {
//       setErrorMessage('Something went wrong. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100">
//       {/* Navbar */}
//       {/* <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
//         <div className="container">
//           <a className="navbar-brand" href="/">EduSync</a>
//           <div className="ms-auto">
//             <a className="btn btn-outline-primary me-2" href="/login">Login</a>
//             <a className="btn btn-primary" href="/register">Register</a>
//           </div>
//         </div>
//       </nav> */}

//       {/* Main Register Section */}
//       <main className="flex-fill d-flex align-items-center justify-content-center bg-light">
//         <div className="card shadow-sm p-4" style={{ minWidth: '350px', maxWidth: '400px', width: '100%' }}>
//           <h4 className="mb-3 text-center">Create an Account</h4>

//           {errorMessage && (
//             <div className="alert alert-danger">{errorMessage}</div>
//           )}

//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="email" className="form-label">Email address</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 id="email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="password" className="form-label">Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="mb-3">
//               <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//               <input
//                 type="password"
//                 className="form-control"
//                 id="confirmPassword"
//                 required
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
//               {isLoading ? 'Registering...' : 'Register'}
//             </button>
//           </form>

//           <div className="text-center mt-3">
//             <small>
//               Already have an account? <a href="/login">Register here</a>
//             </small>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <footer className="bg-dark text-light text-center py-3 mt-auto">
//         &copy; {new Date().getFullYear()} EduSync. All rights reserved.
//       </footer>
//     </div>
//   );
// }

// export default Register;




// import React, { useState } from 'react';
// // import { useAuth } from './AuthContext';
// import { useAuth } from '../../contexts/AuthContext'; // ✅ correct

// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [role, setRole] = useState('Student'); // Default role
//   const [isLoading, setIsLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
  
//   const { register, error } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setErrorMessage('');
//     setSuccessMessage('');
    
//     // Validate password match
//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match');
//       setIsLoading(false);
//       return;
//     }
    
//     try {
//       const result = await register(name, email, password, role);
//       if (result.success) {
//         setSuccessMessage('Registration successful! Redirecting to login...');
//         setTimeout(() => {
//           navigate('/login');
//         }, 2000);
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
//     <div className="register-container">
//       <h2>Create an Account</h2>
      
//       {errorMessage && <div className="error-message">{errorMessage}</div>}
//       {error && <div className="error-message">{error}</div>}
//       {successMessage && <div className="success-message">{successMessage}</div>}
      
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label htmlFor="name">Full Name</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//         </div>
        
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
        
//         <div className="form-group">
//           <label htmlFor="confirmPassword">Confirm Password</label>
//           <input
//             type="password"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
        
//         <div className="form-group">
//           <label htmlFor="role">Role</label>
//           <select
//             id="role"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             required
//           >
//             <option value="Student">Student</option>
//             <option value="Instructor">Instructor</option>
//             <option value="Admin">Admin</option>
//           </select>
//         </div>
        
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Registering...' : 'Register'}
//         </button>
//       </form>
      
//       <div className="login-link">
//         Already have an account? <a href="/login">Login</a>
//       </div>
//     </div>
//   );
// }

// export default Register;





// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
// import { register } from '../../services/authService';

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     role: 'student'
//   });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
    
//     // Password validation
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
    
//     if (formData.password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
    
//     setLoading(true);
//     try {
//       await register(formData);
//       setSuccess(true);
//       // Redirect to login after 2 seconds
//       setTimeout(() => {
//         navigate('/login');
//       }, 2000);
//     } catch (err) {
//       setError(err.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2 className="text-center mb-4">Create an Account</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         {success && <Alert variant="success">Registration successful! Redirecting to login...</Alert>}
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Full Name</Form.Label>
//             <Form.Control
//               type="text"
//               name="name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Form.Group className="mb-3">
//             <Form.Label>Email</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//           </Form.Group>
//           <Row className="mb-3">
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//             <Col md={6}>
//               <Form.Group>
//                 <Form.Label>Confirm Password</Form.Label>
//                 <Form.Control
//                   type="password"
//                   name="confirmPassword"
//                   value={formData.confirmPassword}
//                   onChange={handleChange}
//                   required
//                 />
//               </Form.Group>
//             </Col>
//           </Row>
//           <Form.Group className="mb-3">
//             <Form.Label>Role</Form.Label>
//             <Form.Select
//               name="role"
//               value={formData.role}
//               onChange={handleChange}
//               required
//             >
//               <option value="student">Student</option>
//               <option value="instructor">Instructor</option>
//             </Form.Select>
//           </Form.Group>
//           <Button variant="primary" type="submit" disabled={loading} className="w-100">
//             {loading ? 'Registering...' : 'Register'}
//           </Button>
//         </Form>
//         <div className="text-center mt-3">
//           <p>
//             Already have an account? <a href="/login">Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;