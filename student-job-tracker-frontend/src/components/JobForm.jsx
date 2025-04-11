import React, { useState } from 'react';
import { addJob } from '../services/api';

const JobForm = ({ onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    status: 'Applied',
    link: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addJob(formData);
      onJobAdded(); // Refresh the job list
      setFormData({ company: '', role: '', status: 'Applied', link: '', date: '' });
    } catch (error) {
      console.error('Error adding job:', error);
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h4>Add Job Application</h4>
      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option>Applied</option>
              <option>Interviewing</option>
              <option>Offered</option>
              <option>Rejected</option>
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="url"
              className="form-control"
              placeholder="Application Link"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary" type="submit">Add Job</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
