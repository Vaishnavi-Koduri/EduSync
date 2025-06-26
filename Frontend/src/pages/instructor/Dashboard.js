// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { getMyCourses } from '../../services/instructorService';
// import { useAuth } from '../../contexts/AuthContext';

// const InstructorDashboard = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { getAuthHeader } = useAuth();

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await fetch('https://localhost:7046/api/Courses/mycourses', {
//           headers: getAuthHeader()
//         });

//         if (!response.ok) throw new Error('Failed to fetch courses');

//         const data = await response.json();
//         setCourses(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchCourses();
//   }, [getAuthHeader]);

//   return (
//     <Container>
//       <h1>Instructor Dashboard</h1>

//       <Row className="mb-4">
//         <Col>
//           <Link to="/instructor/courses/new">
//             <Button variant="primary">Create New Course</Button>
//           </Link>
//         </Col>
//       </Row>

//       {loading ? (
//         <Spinner animation="border" />
//       ) : error ? (
//         <p className="text-danger">{error}</p>
//       ) : courses.length === 0 ? (
//         <p>You have not created any courses yet.</p>
//       ) : (
//         <Row>
//           {courses.map((course) => (
//             <Col md={4} key={course.courseId} className="mb-4">
//               <Card>
//                 <Card.Img variant="top" src={course.mediaUrl} style={{ height: '200px', objectFit: 'cover' }} />
//                 <Card.Body>
//                   <Card.Title>{course.title}</Card.Title>
//                   <Card.Text>{course.description}</Card.Text>
//                   <Link to={`/instructor/courses/update/${course.courseId}`}>
//                     <Button variant="warning" className="me-2">Update</Button>
//                   </Link>
//                   <Button variant="danger" onClick={() => handleDelete(course.courseId)}>Delete</Button>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       )}
//     </Container>
//   );

//   async function handleDelete(courseId) {
//     if (!window.confirm('Are you sure you want to delete this course?')) return;

//     try {
//       const response = await fetch(`https://localhost:7046/api/Courses/delcourse/${courseId}`, {
//         method: 'DELETE',
//         headers: getAuthHeader()
//       });

//       if (!response.ok) throw new Error('Delete failed');

//       // Remove deleted course from state
//       setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
//     } catch (err) {
//       alert(`Error: ${err.message}`);
//     }
//   }
// };

// export default InstructorDashboard;

import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('https://localhost:7046/api/Courses/mycourses', {
          headers: getAuthHeader()
        });

        if (!response.ok) throw new Error('Failed to fetch courses');

        const data = await response.json();
        console.log("Fetched courses data:", data);

        // Handle both array and object responses safely
        if (Array.isArray(data)) {
          setCourses(data);
        } else if (Array.isArray(data.courses)) {
          setCourses(data.courses);
        } else {
          throw new Error('Unexpected response format');
        }
      } catch (err) {
        console.error(err);
        setError(err.message);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [getAuthHeader]);

  async function handleDelete(courseId) {
    if (!window.confirm('Are you sure you want to delete this course?')) return;

    try {
      const response = await fetch(`https://localhost:7046/api/Courses/delcourse/${courseId}`, {
        method: 'DELETE',
        headers: getAuthHeader()
      });

      if (!response.ok) throw new Error('Delete failed');

      // Remove deleted course from state
      setCourses((prev) => prev.filter((c) => c.courseId !== courseId));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  }

  return (
    <Container>
      <h1>Instructor Dashboard</h1>

      <Row className="mb-4">
        <Col>
          <Link to="/instructor/courses/new">
            <Button variant="primary">Create New Course</Button>
          </Link>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : courses.length === 0 ? (
        <p>You have not created any courses yet.</p>
      ) : (
        <Row>
          {courses.map((course) => (
            <Col md={4} key={course.courseId} className="mb-4">
              <Card>
                <Card.Img variant="top" src={course.mediaUrl} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Link to={`/instructor/courses/update/${course.courseId}`}>
                    <Button variant="warning" className="me-2">Update</Button>
                  </Link>
                  <Button variant="danger" onClick={() => handleDelete(course.courseId)}>Delete</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default InstructorDashboard;
