// src/components/JobList.jsx
import React from "react";
import { Table, Button } from "react-bootstrap";
import EditJobModal from "./EditJobModal";
import { deleteJob } from "../services/api"; 

const JobList = ({ jobs, refreshJobs }) => {
  const [editingJob, setEditingJob] = React.useState(null);

  const handleDelete = async (id) => {
    try {
      await deleteJob(id);
      refreshJobs(); // ✅ refresh jobs list
    } catch (err) {
      console.error("Error deleting job:", err);
    }
  };

  return (
    <>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Company</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td>{job.company}</td>
              <td>{job.role}</td>
              <td>{job.status}</td>
              <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setEditingJob(job)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(job._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {editingJob && (
        <EditJobModal
          job={editingJob}
          handleClose={() => setEditingJob(null)}
          onJobUpdated={refreshJobs} // ✅ correct prop name
        />
      )}
    </>
  );
};

export default JobList;
