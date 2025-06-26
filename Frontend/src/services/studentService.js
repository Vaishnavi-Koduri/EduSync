// src/services/studentService.js
import { useAuth } from '../contexts/AuthContext';
const API_BASE_URL = 'https://localhost:7046/api';

// Hook to use auth header inside a service
const useStudentService = () => {
  const { getAuthHeader } = useAuth();

  const getAvailableCourses = async () => {
    const response = await fetch(`${API_BASE_URL}/Courses`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch courses: ${errorText}`);
    }

    return await response.json();
  };

  const getStudentDashboard = async () => {
    const response = await fetch(`${API_BASE_URL}/Courses`, {
      headers: {
        ...getAuthHeader(),
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch dashboard data: ${errorText}`);
    }

    const courses = await response.json();

    return {
      enrolledCourses: courses.length,
      completedCourses: 0,
      upcomingAssessments: 0,
      coursesInProgress: courses.map(course => ({
        id: course.courseId,
        title: course.title,
        instructor: course.instructorName || 'Unknown Instructor',
        progress: 0,
      })),
      announcements: [],
    };
  };

  return { getAvailableCourses, getStudentDashboard };
};

export default useStudentService;
