//const express = require("express");
const { Router } = require("express");

const CourseRouter = Router();

CourseRouter.get("/preview", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

CourseRouter.post("/purchase", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

module.exports = {
  CourseRouter: CourseRouter,
};
