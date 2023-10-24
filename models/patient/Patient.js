// email (string), password (string), mobile (string), fullName (string), dateOfBirth (date), address (string)
import mongoose from "mongoose";

let patientSchema = new mongoose.Schema({
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
  dateofBrith: {
    type: date,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

export default mongoose.model("patient", patientSchema, "patient");
