const express = require("express");
const mongoose = require("mongoose");
const jobOpening = express.Router();
OpeningSchema = mongoose.Schema({
  Heading: {
    type: String,
    unique: true,
    required: true,
  },
  Description: {
    type: String,
    unique: true,
    required: true,
  },
  Requirements: {
    required: true,
    type: String,
  },
  Image: {
    type: String,
  },
});
const Opening = mongoose.model("Opening", OpeningSchema);
jobOpening.post("/jobOpening", async (req, res) => {
  const data = req.body;
  try {
    const resp = await Opening.insertOne(data);
    console.log(resp);
    res.send("Data Inserted Successfully");
  } catch (err) {
    console.log(err);
    res.send("error");
  }
});
jobOpening.get("/jobOpening", async (req, res) => {
  try {
    const data = await Opening.find({});
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
jobOpening.get("/jobOpeningHeading/:Heading", async (req, res) => {
  try {
    const body = req.params.Heading;
    const data = await Opening.find({ Heading: body });
    console.log(data);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
jobOpening.delete("/jobOpening/:Heading", async (req, res) => {
  try {
    const Heading = req.params.Heading;
    const resp = await Opening.deleteOne({ Heading: Heading });
    console.log(resp);
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = jobOpening;
