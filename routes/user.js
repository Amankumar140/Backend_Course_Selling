import { Router } from "express";

const UserRouter = Router();

UserRouter.post("/signup", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

UserRouter.post("/login", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});


UserRouter.get("/purchases", function (req, res) {
  res.json({
    msg: "signup endpoint",
  });
});

export default UserRouter;
