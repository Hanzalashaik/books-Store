import express from "express"
import userModel from "../../models/Users/Users.js"

let router = express.Router();

//Get all
router.get("/getall",async(req,res)=>{
    try {
     let userData=await userModel.find({});
    res.status(200).json(userData);
    } catch (error) {
      res.status(500).json({ sucess: false, msg: "Internel Server Error" });
    }
  })

  //GET BY ID
router.get("/get/:ID", async (req, res) => {
    try {
      let id = req.params.ID;
      let userData = await userModel.findById(id);
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // UPDATE BY ID
  router.put("/update/:ID", async (req, res) => {
    try {
      let id = req.params.ID;
      let userData = req.body;
      await userModel.findByIdAndUpdate(
        {
          _id: id,
        },
        {
          $set: userData,
        },
        {
          new: true,
        }
      );
      res.status(200).json({ msg: "Updated sucessfully..." });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // DELETE - ALL
  router.delete("/deleteall", async (req, res) => {
    try {
      await userModel.deleteMany({});
      res.status(200).json({ msg: " Deleted Sucessfully!! " });
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  // DELETE BY ID
  router.delete("/delete/:ID", async (req, res) => {
    try {
      let id = req.params.ID;
      await userModel.findByIdAndDelete(id);
      res.status(200).json({ msg: "Deleted Sucessfully!!" });
    } catch (error) {
      res.status(500).json({ msg: "Internel server error" });
    }
  });
  
  
  
  export default router;