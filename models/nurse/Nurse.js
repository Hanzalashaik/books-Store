import mongoose from "mongoose";

let nurseSchema = new mongoose.Schema(
  {

    //email (string), password (string), mobile (string), fullName (string), shift (string)
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
    shift: {
      type: Number,
      required: true,
    },
  }
);

export default mongoose.model("nurse",nurseSchema , "nurse");
