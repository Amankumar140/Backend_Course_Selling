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
adminRouter.put("/put-course", adminMiddleWare, async function (req, res) {
  try {
    const adminId = req.adminId;
    const { title, description, imageUrl, price, courseId } = req.body;

    // check first that is the courseId is belongs to the same createID or not

    // updateOne works on what basis its update,

    const course = await courseModel.updateOne(
      {
        _id: courseId,
        creatorId: adminId, // for verification
      },
      {
        title: title,
        description: description,
        imageUrl: imageUrl,
        price: price,
      }
    );
    if (course.matchedCount === 0) {
      return res.status(404).json({
        msg: "Course not found or not owned by this admin",
      });
    }

    res.json({
      msg: "Course updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      msg: "Internal server error",
      error: err.message,
    });
  }
});

//^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^6

// get all course for admin
adminRouter.get("/all-course", adminMiddleWare, async function (req, res) {
  const adminId = req.adminId;

  const courses = await courseModel.find({
    creatorId: adminId, // for verification
  });

  if (courses) {
    res.json({
      msg: "update happens ",
      courses,
    });
  } else {
    res.status(403).json({
      msg: "something wrong in id",
    });
  }
});

module.exports = {
  adminRouter: adminRouter,
};
