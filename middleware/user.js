const jwt = require("jsonwebtoken");
const {JWT_USER_PASS}=require("../config")

function UserMiddleWare(req, res, next) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_USER_PASS);
    if(decoded){
        req.userId=decoded.id;
        next()
    } else{
        res.status(403).json({
            msg:"You are not sign in"
        })
    }
}

module.exports({
  UserMiddleWare: UserMiddleWare,
});
