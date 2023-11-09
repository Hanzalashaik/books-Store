import express from "express";
import bcrypt from "bcrypt";
import config from "config";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";


import sendSMS from "../../../utils/sms.js";
import randomString from "../../../utils/randomString.js";
import userModel from "../../../models/Users/Users.js";
import {
  userRegisterValidations,
  errorMiddelware,
} from "../../../middleware/users/index.js";


const router = express.Router();

router.post(
  "/register",
  userRegisterValidations(),
  errorMiddelware,
  async (req, res) => {
    try {
      // let userData = req.body;
      let userData = new userModel(req.body);
      // console.log(userData);

      // console.log(userData.userverifytoken);

      // //checking for already exist
      let emailCheck = await userModel.findOne({ email: userData.email });
      let phoneCheck = await userModel.findOne({ phone: userData.phone });

      if (emailCheck || phoneCheck) {
        return res.status(409).json({ msg: "Email and Phone Already Exist" });
      }

      // // Hashing password
      let hashPassword = await bcrypt.hash(userData.password, 10);
      userData.password = hashPassword;

      // //user verification
      userData.userverifytoken.email = randomString(10);
      userData.userverifytoken.phone = randomString(10);
      // // console.log(userData);

      // //user authorization
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

      sendSMS({
        body: `Hi ${
          userData.firstName
        }, Please click the given link to verify your phone ${config.get(
          "URL"
        )}/user/phone/verify/${phoneToken}`,
        phonenumber: userData.phone,
      });

      // console.log(`${config.get("URL")}/user/phone/verify/${phoneToken}`);

      await userData.save();

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

    if (!verify) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }
    let userData = await userModel.findOne({
      "userverifytoken.email": verify.email,
    });
    if (!userData) {
      return res
        .status(200)
        .json({ success: "The Email has been Verified Already." });
    }
    // console.log(userData);
    userData.userverified.email = true;

    await userData.save();
    res.status(200).json({ success: "The Email has been Verified." });
  } catch (error) {
    console.log(error);

    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

router.get("/phone/verify/:token", async (req, res) => {
  try {
    let token = req.params.token;
    let verify = jwt.verify(token, config.get("JWTKEY"));
    // console.log(verify);

    if (!verify) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Token Expire , Register Again" });
    }

    let userData = await userModel.findOne({
      "userverifytoken.phone": verify.phone,
    });
    // console.log(userData);

    if (!userData) {
      return res
        .status(200)
        .json({ success: "The Phone has been Verified Already." });
    }

    userData.userverified.phone = true;
    await userData.save();
    res.status(200).json({ success: "The Phone has been Verified." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
});

router.post("/login",async (req,res)=>{
  try {
    let {email,password}=req.body;
    let emailFound=await userModel.find({email});
    
    if(!emailFound){
      return res.status(400).json({msg:"Please Register"});
    }

    let passwordFound=await userModel.find({password});
    if(!passwordFound){
      return res.status(400).json({msg:"Incorrect Password"});
    }

    let jwtsignToken =jwt.sign({email},config.get("JWTKEY"),{expiresIn:"1h"});

    let encryptedToken=CryptoJS.AES.encrypt(jwtsignToken,config.get("CRYPTOKEY")).toString();
   
    if(!encryptedToken){
      res.status(201).json({msg:"Token Expire"})
    }
    res.status(201).json({msg:"LoggedIn Sucessfully",encryptedToken})
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ sucess: false, msg: "Internel Server Error" });
  }
})





//Update by ID 
//Delete by ID
//Delete all
//Get By ID

export default router;
