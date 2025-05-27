const mongoose = require("mongoose");
const express = require("express");
const appliedJobs = express.Router();
const appliedJobsSchema = mongoose.Schema({
  Description: {
    type: String,
    required: true,
  },
  Heading: {
    type: String,
    required: true,
  },

  Requirements: {
    required: true,
    type: String,
  },
  Image: {
    type: String,
  },
  Status: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
});
const appliedJobsModel = mongoose.model("appliedJobs", appliedJobsSchema);
appliedJobs.post("/appliedJobs", async (req, res) => {
  try {
    const data = req.body;
    const resp = await appliedJobsModel.insertOne(data);
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
appliedJobs.get("/appliedJobs", async (req, res) => {
  try {
    const data = await appliedJobsModel.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
appliedJobs.put("/appliedJobs", async (req, res) => {
  try {
    const status = req.body.Status;
    email = req.body.Email;
    const resp = await appliedJobsModel.updateOne(
      { Email: email, Heading: req.body.For },
      { Status: status }
    );
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
appliedJobs.delete("/appliedJobs", async (req, res) => {
  try {
    const Desc = req.body.Desc;
    const resp = await appliedJobsModel.deleteOne({
      Description: Desc,
    });
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = appliedJobs;
