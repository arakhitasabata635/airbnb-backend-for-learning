const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    requird: [true, "First name is required"],
  },
  lastName: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    requird: [true, "Password is required"],
  },
  userType: {
    type: String,
    enum: ["guest", "host"],
    default: "guest",
  },
  favourites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Home'
  }],
});
module.exports = mongoose.model("User", userSchema);
