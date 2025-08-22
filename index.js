const express = require("express");
const jwt = require("jsonwebtoken");

const { MongoDB_URL } = require("./config.js");
const mongoose = require("mongoose");

// Connect to the database

const { UserRouter } = require("./routes/user.js");
const { CourseRouter } = require("./routes/Course.js");
const { adminRouter } = require("./routes/admin.js");

const app = express();

app.use(express.json());

app.use("/user", UserRouter);
app.use("/admin", adminRouter);
app.use("/course", CourseRouter);

async function main() {
  await mongoose.connect(MongoDB_URL);
  app.listen(3000);
  console.log("Listen on port 3000");
}

main();
