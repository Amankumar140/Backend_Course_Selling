//const express = require("express");
const { Router } = require("express");

const { userMiddleWare } = require("../middleware/user");
const { purchaseModel, courseModel } = require("../Schema/Schema");
const CourseRouter = Router();

CourseRouter.get("/preview", userMiddleWare, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    msg: `$Successfully bought{courseId}`,
  });
});

CourseRouter.post("/purchase", async function (req, res) {
  const courses = await courseModel.find({});
  res.json({
     courses
  });
});

module.exports = {
  CourseRouter: CourseRouter,
};
