const mongoose = require("mongoose"); // for import mongoose
const { Schema } = mongoose; //for  import mongoose schema
const UserSchema = new Schema({
    // creat a schema like js object type
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }, 
  date: {
    type: Date,
    default: Date.now,
  },
});
const User = mongoose.model("user", UserSchema); // for creat a model in to models folder
module.exports = User; //for export a user variable
