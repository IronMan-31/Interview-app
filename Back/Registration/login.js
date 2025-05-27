const express = require("express");
const mongoose = require("mongoose");
const cookies = require("cookie-parser");

const dataSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  recruiter: {
    type: Boolean,
    required: true,
  },
});
const DataCollection = mongoose.model("data", dataSchema);
const router = express.Router();
router.use(cookies());
router.post("/register", async (req, res) => {
  const findData = await DataCollection.find({ email: req.body.email });
  console.log(findData.length);
  let recruiter = false;
  if (req.body.recruiter == "on") {
    recruiter = true;
  }
  if (findData.length == 0) {
    console.log(req.body);
    const Data = await DataCollection.insertOne({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      recruiter: recruiter,
    });
    res.send("Data inserted Successfully");
  } else {
    res.send("This email already exists");
  }
});
router.post("/login", async (req, res) => {
  const data = req.body;
  const fetchedData = await DataCollection.find({ email: data.email });
  console.log(fetchedData[0].recruiter);
  console.log(data.email);
  if (fetchedData.length == 0) {
    res.send(false);
  } else {
    if (data.password == fetchedData[0].password) {
      res.send(true);
    } else {
      res.send(false);
    }
  }
});
router.post("/recruiter", async (req, res) => {
  try {
    const email = req.body.Email;
    const isRecruiter = await DataCollection.find({ email: email });
    console.log(isRecruiter[0].recruiter);
    res.send(isRecruiter[0].recruiter);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});
module.exports = router;
