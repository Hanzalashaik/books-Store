import mongoose from "mongoose";

let doctorSchema = new mongoose.Schema({
  //email (string), password (string), mobile (string), fullName (string), specialization (string)
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
  specialization: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("doctor", doctorSchema, "doctor");