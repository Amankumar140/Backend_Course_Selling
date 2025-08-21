const { Router } = require("express");

const adminRouter = Router();
const { adminModel } = require("../Schema/Schema");
const { z } = require("zod");
const bcrypt = require("bcrypt");

//adminRouter.use();

adminRouter.post("/signup", function (req, res) {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string().max(10).min(6),
    firstName: z.string().min(3),
    secondName: z.string().min(3),
  });

  const validateData = requiredBody.safeParse(req.body);
  if (!validateData.success) {
    res.json({
      msg: "invalid input",
      error: validateData.error.issues,
    });
  }

  const { email , password ,firstName, secondName}=validateData.data


  // bcrypt

  const hashPassword=bcrypt.hash(password,5);

  res.json({
    msg: "signup endpoint",
  });
});

adminRouter.post("/login", function (req, res) {
  res.json({
    msg: "login endpoint",
  });
});

adminRouter.post("/create-Course", function (req, res) {
  res.json({
    msg: "login endpoint",
  });
});

adminRouter.put("/put-course", function (req, res) {
  res.json({
    msg: "login endpoint",
  });
});

adminRouter.get("/all-course", function (req, res) {
  res.json({
    msg: "login endpoint",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
