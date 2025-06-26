import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const UpdateCourse = () => {
  const { courseId } = useParams();  // Get courseId from URL
  const navigate = useNavigate();
  const { getAuthHeader } = useAuth();

  const [course, setCourse] = useState({
    courseId: '',
    title: '',
    description: ''
  });

  const [mediaFile, setMediaFile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch course details when the component mounts
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://localhost:7046/api/Courses/course/${encodeURIComponent(courseId)}`, {
          headers: getAuthHeader(),
        });
        setCourse(response.data);  // Directly set the returned object
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch course:', error);
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId, getAuthHeader]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', course.title);
    formData.append('description', course.description);
    if (mediaFile) {
      formData.append('mediaFile', mediaFile);
    }

    try {
      await axios.put(`https://localhost:7046/api/Courses/updatecourse/${encodeURIComponent(course.courseId)}`, formData, {
        headers: {
          ...getAuthHeader(),
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Course updated successfully!');
      navigate('/instructor/dashboard');
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course.');
    }
  };

  const handleChange = (e) => {
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="form-control"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">Media File</label>
          <input
            type="file"
            name="mediaFile"
            onChange={(e) => setMediaFile(e.target.files[0])}
            className="form-control"
          />
        </div>

        <button type="submit" className="btn btn-success">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default UpdateCourse;
