import React, { useEffect, useState } from 'react';
import { Card, Row, Col, ProgressBar, Alert, Container } from 'react-bootstrap';
import useStudentService from '../../services/studentService';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [availableCourses, setAvailableCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { getStudentDashboard, getAvailableCourses } = useStudentService(); // ✅ call hook at top level

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const dashboard = await getStudentDashboard();
        const courses = await getAvailableCourses();
        setDashboardData(dashboard);
        setAvailableCourses(courses);
      } catch (err) {
        setError(err.message || 'Something went wrong while fetching data.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [getStudentDashboard, getAvailableCourses]); // ✅ include dependencies

  if (loading) return <div>Loading...</div>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="dashboard-container mt-4">
      <h2 className="mb-4">Student Dashboard</h2>

      {/* Stats */}
      <Row className="mb-4">
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Enrolled Courses</Card.Title>
              <Card.Text>{dashboardData.enrolledCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Completed Courses</Card.Title>
              <Card.Text>{dashboardData.completedCourses}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Upcoming Assessments</Card.Title>
              <Card.Text>{dashboardData.upcomingAssessments}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Available Courses */}
      <h4 className="mt-4 mb-3">Available Courses</h4>
      <Row>
        {availableCourses.length === 0 ? (
          <p>No available courses found.</p>
        ) : (
          availableCourses.map(course => (
            <Col md={4} key={course.courseId} className="mb-4">
              <Card>
                <Card.Img variant="top" src={course.mediaUrl || '/default-course.jpg'} />
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Text>{course.description}</Card.Text>
                  <Card.Text>
                    <small className="text-muted">Instructor: {course.instructorName}</small>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>

      {/* Course Progress */}
      <h4 className="mt-5 mb-3">Your Course Progress</h4>
      <Row>
        {dashboardData.coursesInProgress.length === 0 ? (
          <p>No courses in progress.</p>
        ) : (
          dashboardData.coursesInProgress.map(course => (
            <Col md={6} key={course.id} className="mb-4">
              <Card>
                <Card.Body>
                  <Card.Title>{course.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    Instructor: {course.instructor}
                  </Card.Subtitle>
                  <ProgressBar now={course.progress} label={`${course.progress}%`} />
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;



// import React, { useEffect, useState } from 'react';
// import { Card, Row, Col, ProgressBar, Alert, Container } from 'react-bootstrap';
// import useStudentService from '../../services/studentService';

// const Dashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [availableCourses, setAvailableCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const { getStudentDashboard, getAvailableCourses } = useStudentService();

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const dashboard = await getStudentDashboard();
//         const courses = await getAvailableCourses();
//         setDashboardData(dashboard);
//         setAvailableCourses(courses);
//       } catch (err) {
//         setError(err.message || 'Something went wrong while fetching data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <Alert variant="danger">{error}</Alert>;

//   return (
//     <Container className="dashboard-container mt-4">
//       <h2 className="mb-4">Student Dashboard</h2>
//       {/* Stats */}
//       <Row className="mb-4">
//         <Col md={4}>
//           <Card><Card.Body><Card.Title>Enrolled Courses</Card.Title><Card.Text>{dashboardData.enrolledCourses}</Card.Text></Card.Body></Card>
//         </Col>
//         <Col md={4}>
//           <Card><Card.Body><Card.Title>Completed Courses</Card.Title><Card.Text>{dashboardData.completedCourses}</Card.Text></Card.Body></Card>
//         </Col>
//         <Col md={4}>
//           <Card><Card.Body><Card.Title>Upcoming Assessments</Card.Title><Card.Text>{dashboardData.upcomingAssessments}</Card.Text></Card.Body></Card>
//         </Col>
//       </Row>

//       {/* Available Courses */}
//       <h4 className="mt-4 mb-3">Available Courses</h4>
//       <Row>
//         {availableCourses.length === 0 ? (
//           <p>No available courses found.</p>
//         ) : (
//           availableCourses.map(course => (
//             <Col md={4} key={course.courseId} className="mb-4">
//               <Card>
//                 <Card.Img variant="top" src={course.mediaUrl || '/default-course.jpg'} />
//                 <Card.Body>
//                   <Card.Title>{course.title}</Card.Title>
//                   <Card.Text>{course.description}</Card.Text>
//                   <Card.Text>
//                     <small className="text-muted">Instructor: {course.instructorName}</small>
//                   </Card.Text>
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>

//       {/* Course Progress */}
//       <h4 className="mt-5 mb-3">Your Course Progress</h4>
//       <Row>
//         {dashboardData.coursesInProgress.length === 0 ? (
//           <p>No courses in progress.</p>
//         ) : (
//           dashboardData.coursesInProgress.map(course => (
//             <Col md={6} key={course.id} className="mb-4">
//               <Card>
//                 <Card.Body>
//                   <Card.Title>{course.title}</Card.Title>
//                   <Card.Subtitle className="mb-2 text-muted">
//                     Instructor: {course.instructor}
//                   </Card.Subtitle>
//                   <ProgressBar now={course.progress} label={`${course.progress}%`} />
//                 </Card.Body>
//               </Card>
//             </Col>
//           ))
//         )}
//       </Row>
//     </Container>
//   );
// };

// export default Dashboard;