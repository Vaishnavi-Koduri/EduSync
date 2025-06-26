import { useAuth } from '../contexts/AuthContext';

const BASE_URL = 'https://localhost:7046/api/Courses';

// Utility to get headers with JWT
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('eduSyncUser'));
  return {
    Authorization: `Bearer ${user?.jwt}`
  };
};

// Upload a new course (with media)
export const createCourse = async (formData) => {
  const response = await fetch(`${BASE_URL}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: formData // FormData object including title, description, media
  });

  if (!response.ok) {
    const err = await response.text();
    throw new Error(err || 'Failed to create course');
  }

  return await response.json();
};

// Get all courses created by the instructor
export const getMyCourses = async () => {
  const response = await fetch(`${BASE_URL}/mycourses`, {
    headers: getAuthHeaders()
  });

  if (!response.ok) throw new Error('Failed to fetch your courses');
  return await response.json();
};



// // Services for instructor functionality

// // Mock API response delay
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// // Create a new course
// export const createCourse = async (courseData) => {
//   try {
//     // Simulating API call
//     await delay(1000);
    
//     // Basic validation
//     if (!courseData.title || !courseData.description || !courseData.category) {
//       throw new Error('Course title, description and category are required');
//     }
    
//     // In a real app, this would send the data to the backend
//     // For demo purposes, just return a success response with an ID
//     return {
//       id: 'course_' + Date.now(),
//       ...courseData,
//       createdAt: new Date().toISOString()
//     };
//   } catch (error) {
//     throw error;
//   }
// };

// // Get instructor dashboard data
// export const getInstructorDashboard = async () => {
//   try {
//     // Simulating API call
//     await delay(800);
    
//     // Mock dashboard data
//     return {
//       totalCourses: 3,
//       totalStudents: 45,
//       recentActivityCount: 12,
//       courseStats: [
//         {
//           id: '301',
//           title: 'Introduction to React',
//           students: 22,
//           rating: 4.7,
//           recentActivity: 8
//         },
//         {
//           id: '302',
//           title: 'Advanced JavaScript Patterns',
//           students: 15,
//           rating: 4.9,
//           recentActivity: 3
//         },
//         {
//           id: '303',
//           title: 'CSS Masterclass',
//           students: 8,
//           rating: 4.5,
//           recentActivity: 1
//         }
//       ],
//       recentFeedback: [
//         {
//           id: '401',
//           courseTitle: 'Introduction to React',
//           studentName: 'John Doe',
//           comment: 'Great explanations of complex concepts!',
//           rating: 5,
//           date: '2025-05-04T15:20:00Z'
//         },
//         {
//           id: '402',
//           courseTitle: 'Advanced JavaScript Patterns',
//           studentName: 'Sarah Mitchell',
//           comment: 'The exercises were very helpful for understanding.',
//           rating: 5,
//           date: '2025-05-02T09:15:00Z'
//         }
//       ]
//     };
//   } catch (error) {
//     throw new Error('Failed to fetch instructor dashboard data');
//   }
// };