import mongoose from "mongoose";

let adminSchema = new mongoose.Schema({
  //email (string), password (string), mobile (string), fullName (string)
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  fullName: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("admin", adminSchema, "admin");
