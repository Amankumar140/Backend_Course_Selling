//const express = require("express");
const { Router } = require("express");

const CourseRouter = Router();

CourseRouter.get("/courses", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

CourseRouter.post("/course/purchase", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

module.exports({
    CourseRouter:CourseRouter
})
