import express from "express";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";

// import sendSMS from "../utils/sms.js";
import randomString from "../../utils/randomString.js";
import userModel from "../../models/Users/Users.js";
import {
  userRegisterValidations,
  errorMiddelware,
} from "../../middleware/users/index.js";

const router = express.Router();

router.post(
  "/register",
  userRegisterValidations(),
  errorMiddelware,
  async (req, res) => {
    try {
      // let userData = req.body;
      let userData = new userModel(req.body);
      console.log(userData);

      console.log(userData.userverifytoken);

      //checking for already exist
      let emailCheck = await userModel.findOne({ email: userData.email });
      let phoneCheck = await userModel.findOne({ phone: userData.phone });

      if (emailCheck || phoneCheck) {
        return res.status(409).json({ msg: "Email and Phone Already Exist" });
      }

      // Hashing password
      let hashPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashPassword;

      //user verification
      userData.userverifytoken.email = randomString(10);
      userData.userverifytoken.phone = randomString(10);
      console.log(userData);

      //user authorization
      let emailToken = jwt.sign(
        { email: userData.userverifytoken.email },
        config.get("JWTKEY"),
        { expiresIn: "60000" }
      );
      let phoneToken = jwt.sign(
        { phone: userData.userverifytoken.phone },
        config.get("JWTKEY"),
        { expiresIn: "60000" }
      );

      console.log(emailToken);
      console.log(phoneToken);

      // sendEmail({
      //   subject: "User Account Verification - Tasky Solutions M7",
      //   to: email,
      //   body: `Hi ${firstname} ${lastname} <br/>
      //       Thank you for Signing Up. Please <a href='${config.get("URL")}/email/verify/${emailToken}'>Click Here </a>
      //       to verify your Email Address. <br/><br/>
      //       Thank you <br/>
      //       <b>Team Tasky M7 Solutions.</b>`,
      // });

      //Trigger SMS Verification

      console.log(`${config.get("URL")}/user/email/verify/${emailToken}`);
      // sendSMS({
      //   body: `Hi ${firstname}, Please click the given link to verify your phone ${config.get("URL")}/phone/verify/${tokenPhone}`,
      //   phone,
      // });

      console.log(`${config.get("URL")}/user/phone/verify/${phoneToken}`);

      await userModel.create(userData);

      res.status(200).json({ sucess: true, msg: "User Rgister Successfully" });
    } catch (error) {
      console.log(error);

      res.status(500).json({ sucess: false, msg: "Internel Server Error" });
    }
  }
);

router.get("/email/verify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let verify = jwt.verify(token, config.get("JWTKEY"));
    // {email:adhjklasdhj}

    // if (!verify) {
    //   return res
    //     .status(401)
    //     .json({ sucess: false, msg: "Token Expire , Register Again" });

    //   }
    console.log(verify);

    let userData = await userModel.findOne({
      "userverifytoken.email": verify.email,
    });
    if (!userData) {
      return res
        .status(200)
        .json({ success: "The Email has been Verified Already." });
    }
    // console.log(token);
    userData.userverifytoken.email = true;
    await userData.save()
    res.status(200).json({ success: "The Email has been Verified." });
  } catch (error) {
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

// router.get("/phone/verify/:token", async (req, res) => {
//   try {
//     let token = req.params.token;
//     let verify = jwt.verify(token, config.get("JWTKEY"));
//     if (!verify) {
//       return res
//         .status(401)
//         .json({ sucess: false, msg: "Token Expire , Register Again" });
//     }
//     res.status(200).end("<h1>Phone Verified Sucessfully</h1>");
//   } catch (error) {
//     res.status(500).json({ sucess: false, msg: "Internel Server Error" });
//   }
// });

export default router;