const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASS } = require("../config");

function adminMiddleWare(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_ADMIN_PASS);

  if (decoded) {
    req.adminId = decoded.id;
    next();
  } else {
    res.status(404).json({
      msg: "You are not sign in",
    });
  }
}

module.exports = {
  adminMiddleWare: adminMiddleWare,
};
