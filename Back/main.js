const express = require("express");
const mongoose = require("mongoose");
const registration = require("./Registration/login");
const jobOpening = require("./JobOpening/jobOpening");
const meet = require("./Meeting/meeting");
const webToken = require("./Meeting/zego");
const applicants = require("./Applicants/applicants");
const appliedJobs = require("./AppliedJobs/appliedJobs");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 2000;
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

mongoose
  .connect("mongodb://localhost:27017/registerData")
  .then(() => {
    console.log("Connection successful");
  })
  .catch(() => {
    console.log("Connection failed");
  });

app.use("/", registration, jobOpening, meet, webToken, applicants, appliedJobs);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
