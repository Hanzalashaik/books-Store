import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    password: {
      type: String
    },
    address: {
      type: String
    },
    userverified: {
      email: {
        type: Boolean,
        default: false,
      },
      phone: {
        type: Boolean,
        default: false,
      }
    },
    userverifytoken: {
      email: {
        type: String,
      },
      phone: {
        type: String,
      }
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema, "users");
