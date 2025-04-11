// src/App.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import JobList from "./components/JobList";
import FilterBar from "./components/FilterBar";
import AddJobModal from "./components/AddJobModal";
import { getJobs } from "./services/api"; 

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const fetchJobs = async () => {
    try {
      const res = await getJobs();
      setJobs(res.data); // this will automatically reflect in filteredJobs
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  // ✅ dynamically filtered view — no stale state
  const filteredJobs =
    filterStatus === ""
      ? jobs
      : jobs.filter((job) => job.status === filterStatus);

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col>
          <h2>🎯 Job Application Tracker</h2>
        </Col>
        <Col className="text-end">
          <Button variant="success" onClick={() => setShowAddModal(true)}>
            + Add Job
          </Button>
        </Col>
      </Row>

      <FilterBar onFilter={handleFilterChange} />
      <JobList jobs={filteredJobs} refreshJobs={fetchJobs} />
      <AddJobModal
        show={showAddModal}
        handleClose={() => setShowAddModal(false)}
        onJobAdded={fetchJobs}
      />
    </Container>
  );
};

export default App;
