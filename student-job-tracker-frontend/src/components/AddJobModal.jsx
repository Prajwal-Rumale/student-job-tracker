// src/components/AddJobModal.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";

const AddJobModal = ({ show, handleClose, onJobAdded }) => {
  const [formData, setFormData] = useState({
    company: "",
    role: "",
    status: "Applied",
    date: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.company || !formData.role || !formData.date) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/jobs", formData);
      onJobAdded(); // refresh the job list
      handleClose(); // close modal
    } catch (err) {
      console.error("Error adding job:", err);
      alert("Failed to add job.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Job</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="company">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Enter company name"
            />
          </Form.Group>

          <Form.Group controlId="role">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter role"
            />
          </Form.Group>

          <Form.Group controlId="status">
            <Form.Label>Status</Form.Label>
            <Form.Select name="status" value={formData.status} onChange={handleChange}>
              <option>Applied</option>
              <option>Interview</option>
              <option>Offer</option>
              <option>Rejected</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="date">
            <Form.Label>Date of Application</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="link">
            <Form.Label>Job Link</Form.Label>
            <Form.Control
              type="url"
              name="link"
              value={formData.link}
              onChange={handleChange}
              placeholder="Paste job URL"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Add Job
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddJobModal;
