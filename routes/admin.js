const { Router } = require("express");
// require("dotenv").config();
const adminRouter = Router();
const { adminModel, courseModel } = require("../Schema/Schema");
const { z, email } = require("zod");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASS } = require("../config.js");
const { adminMiddleWare } = require("../middleware/admin.js");

// ************************************************************************************************************************
//adminRouter.use();

adminRouter.post("/signup", async function (req, res) {
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
    return;
  }

  const { email, password, firstName, secondName } = validateData.data;

  // bcrypt
  try {
    const hashPassword = await bcrypt.hash(password, 5);
    await adminModel.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      secondName: secondName,
    });
  } catch (e) {
    res.json({
      error: e,
    });
  }
  res.json({
    msg: " admin signup",
  });
});

// $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

adminRouter.post("/login", async function (req, res) {
  requiredBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const validateData = requiredBody.safeParse(req.body);
  if (!validateData.success) {
    res.status(403).json({
      msg: validateData.error.issues,
    });
    return;
  }

  const { email, password } = validateData.data;

  const admin = await adminModel.findOne({
    email: email,
  });

  if (!admin) {
    res.json({
      msg: "user not found",
    });
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASS
    );
    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: "incorrect credentials",
    });
  }
});

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// create-course

adminRouter.post("/create-Course", adminMiddleWare, async function (req, res) {
  const adminId = req.adminId;

  const { title, description, imageUrl, price } = req.body;
  

  // saas video in 6 where pipelining for images
  const Course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    msg: "course-create",
    courseId: Course._id,
  });
});

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

// put courses or update
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
