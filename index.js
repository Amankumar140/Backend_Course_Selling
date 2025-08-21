const express = require("express");
const jwt = require("jsonwebtoken");

const { UserRouter } = require("./routes/user.js");
const { CourseRouter } = require("./routes/Course.js");

const app = express();

app.use(express.json());

app.use("/user", UserRouter);
app.use("/course", CourseRouter);

app.listen(3000);
