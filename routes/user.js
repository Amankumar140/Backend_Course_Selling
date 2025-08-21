const { Router } = require("express");

const UserRouter = Router();

UserRouter.post("/signup", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

UserRouter.post("/login", function (req, res) {
  res.json({
    msg: "login endpoint",
  });
});

UserRouter.get("/purchases", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

module.exports={ UserRouter: UserRouter };
