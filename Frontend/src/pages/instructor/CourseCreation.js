import React, { useState } from 'react';
import { createCourse } from '../../services/instructorService';

function CourseCreation() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Title', title);
    formData.append('Description', description);
    formData.append('MediaFile', mediaFile);

    try {
      const result = await createCourse(formData);
      setStatus(`Course created: ${result.course.title}`);
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Course Title</label>
          <input type="text" className="form-control" value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea className="form-control" value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Media File</label>
          <input type="file" className="form-control" onChange={e => setMediaFile(e.target.files[0])} required />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Course</button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
}

export default CourseCreation;