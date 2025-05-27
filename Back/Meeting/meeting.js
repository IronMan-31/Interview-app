const express = require("express");
const mongoose = require("mongoose");
const meetingSchema = mongoose.Schema({
  Email: { type: String, required: true },
  Date: { type: String, required: true },
  Timings: { type: String, required: true, unique: true },
  roomID: { type: String, required: true },
  For: { type: String, required: true },
});
const meeting = mongoose.model("meeting", meetingSchema);
const meet = express.Router();
meet.post("/addMeetings", async (req, res) => {
  try {
    console.log(req.body);
    const data = req.body;
    const resp = await meeting.insertOne(data);
    res.send("meeting added");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
meet.get("/addMeetings", async (req, res) => {
  try {
    const data = await meeting.find({});
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
meet.delete("/addMeetings", async (req, res) => {
  try {
    const email = req.body.Email;
    const resp = await meeting.deleteMany({ Email: email, For: req.body.For });
    console.log("hello");
    console.log(resp);
    res.send(resp);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
module.exports = meet;
