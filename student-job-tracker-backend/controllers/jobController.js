const Job = require("../models/Job");

// POST /api/jobs — Create job
const createJob = async (req, res) => {
  try {
    const job = new Job({
      company: req.body.company,
      position: req.body.position,
      status: req.body.status,
    });
    await job.save();
    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT /api/jobs/:id — Update job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      {
        company: req.body.company,
        position: req.body.position,
        status: req.body.status,
      },
      { new: true }
    );
    res.json(job);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

module.exports = { createJob, updateJob };
