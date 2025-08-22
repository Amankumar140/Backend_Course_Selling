//const express = require("express");
const { Router } = require("express");
const mongoose = require("mongoose");

const { userMiddleWare } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../Schema/Schema");
const CourseRouter = Router();

CourseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
    courses,
  });
});

CourseRouter.post("/purchase", userMiddleWare, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId: new mongoose.Types.ObjectId(courseId),
  });

  res.json({
    msg: `$Successfully bought{courseId}`,
  });
});

module.exports = {
  CourseRouter: CourseRouter,
};
