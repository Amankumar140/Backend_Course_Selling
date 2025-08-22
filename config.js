require("dotenv").config();
const JWT_USER_PASS = process.env.JWT_USER_PASS;
const JWT_ADMIN_PASS=process.env.JWT_ADMIN_PASS;
const MongoDB_URL=process.env.MongoDB_URL
//console.log(MongoDB_URL)
module.exports={
    JWT_USER_PASS,
    JWT_ADMIN_PASS,
    MongoDB_URL
}