const express = require("express");
const jwt = require("jsonwebtoken");

const { UserRouter } = require("./routes/user.js");
const { CourseRouter } = require("./routes/Course.js");
const { adminRouter } = require("./routes/admin.js");

const app = express();

app.use(express.json());

app.use("/user", UserRouter);
app.use("/admin", adminRouter);
app.use("/course", CourseRouter);

app.listen(3000);
