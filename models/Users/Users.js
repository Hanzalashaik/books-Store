import mongoose from "mongoose";

let userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: true,
      maxlength: 15,
      minlength: 2,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
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
    address: {
      type: String,
      required: true,
      maxlength: 100,
      minlength: 4,
    },
    userverified : {
      email:{
        type:Boolean,
        default:false
      },
      phone:{
        type:Boolean,
        default:false
      }
    },
    userverifytoken:{
      email:{
        type:String,
    
      },
      phone:{
        type:String,
     
      }
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Users", userSchema, "users");
