const mongoose = require("mongoose");
require("dotenv").config();
const { Schema } = mongoose;

const mongoURL = process.env.MongoDB_URL;

// Connect to the database
mongoose
  .connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Other options...
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Your Mongoose models and schemas would go here

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  LastName: String,
});

const AdminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstName: String,
  LastName: String,
});

const CourseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  // Correctly referencing the 'Admin' collection
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
  },
});

const PurchaseSchema = new Schema({
  // Correctly referencing the 'Course' and 'User' collections
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const userModel = mongoose.model("User", UserSchema);
const adminModel = mongoose.model("Admin", AdminSchema);
const courseModel = mongoose.model("Course", CourseSchema);
const purchaseModel = mongoose.model("Purchase", PurchaseSchema);

module.exports = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
