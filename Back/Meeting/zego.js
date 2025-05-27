const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();
app.use(express.json());

const ZEGO_APP_ID = 173332652;
const ZEGO_SERVER_SECRET = "367cfc6fcd3ac2c2997ab8b5e1f9f244";
const webToken = express.Router();

webToken.post("/getToken", (req, res) => {
  const { userID } = req.body;

  const payload = {
    app_id: ZEGO_APP_ID,
    user_id: userID,
    nonce: Math.floor(Math.random() * 100000),
    ctime: Math.floor(Date.now() / 1000),
    expire: 3600,
  };

  const token = jwt.sign(payload, ZEGO_SERVER_SECRET, {
    algorithm: "HS256",
  });

  res.json({ token });
});
module.exports = webToken;
