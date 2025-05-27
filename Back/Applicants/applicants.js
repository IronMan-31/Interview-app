const mongoose = require("mongoose");
const express = require("express");
const applicants = express.Router();
const applicantsSchema = mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true },
  For: { type: String, required: true },
  Resume: { type: String, required: true },
  AI: { type: String, required: true },
});
const applicantsModel = mongoose.model("Applicants", applicantsSchema);
applicants.post("/applicants", async (req, res) => {
  try {
    const data = req.body;
    const resp = await applicantsModel.insertOne(data);
    res.send("Applied Successfully");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
applicants.get("/applicants", async (req, res) => {
  try {
    const data = await applicantsModel.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
applicants.delete("/applicants", async (req, res) => {
  try {
    const email = req.body.Email;
    const resp = await applicantsModel.deleteOne({ Email: email });
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = applicants;
