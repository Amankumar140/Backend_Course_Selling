const { Router, response } = require("express");
const { z } = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../Schema/Schema");
const UserRouter = Router();
require("dotenv").config();
const JWT_USER_PASS = process.env.JWT_USER_PASS;

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%5

UserRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string(),
    firstName: z.string().min(3),
    secondName: z.string().min(3),
  });

  const validData = requiredBody.safeParse(req.body);
  if (!validData.success) {
    res.status(403).json({
      error: validData.error.issues,
    });
  }

  const { email, password, firstName, secondName } = validData.data;
  // bcrypt password

  try {
    const hashPassword = await bcrypt.hash(password, 5);
    await userModel.create({
      email: email,
      password: hashPassword,
      firstName: firstName,
      secondName: secondName,
    });
  } catch (error) {
    console.log(error);
  }

  res.json({
    msg: "user signup",
  });
});

//**********************************************************************************************

UserRouter.post("/login", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const validateData = requiredBody.safeParse(req.body);

  if (!validateData.success) {
    res.status(403).json({
      error: validateData.error.issues,
    });
    return 
  }
  const { email, password } = validateData.data;

  const response = await userModel.findOne({
    email: email,
  });

  if (!response) {
    res.json({
      msg: "user not found",
    });
    return 
  }

  const passwordMatch = await bcrypt.compare(password, response.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: response._id.toString(),
      },
      JWT_USER_PASS
    );

    // cookie or session based logic

    res.json({
      token: token,
    });
  } else {
    res.json({
      msg: "incorrect credentials",
    });
  }
});



//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


UserRouter.get("/purchases", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

module.exports = { UserRouter: UserRouter };
