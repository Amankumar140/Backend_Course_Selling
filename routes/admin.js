const { Router } = require("express");

const adminRouter = Router();

//adminRouter.use();

adminRouter.post("/signup", function (req, res) {
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
