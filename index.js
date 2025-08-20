const express = require("express");
const jwt = require("jsonwebtoken");

const app = express();

app.use(express.json());

app.post("/user/signup", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

app.post("/user/login", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

app.get("/courses", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

app.post("/course/purchase", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

app.get("/user/purchases", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

app.listen(3000);
