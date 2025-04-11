const express = require("express");
const mongoose = require("mongoose");
const Job = require("./models/Job"); // Adjust path

const app = express();
app.use(express.json());

// Create job
app.post("/api/jobs", async (req, res) => {
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
});

// Update job
app.put("/api/jobs/:id", async (req, res) => {
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
});
