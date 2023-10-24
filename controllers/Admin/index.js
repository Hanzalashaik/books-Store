import express from "express";
import adminModel from "../../models/admin/Admin.js";

let router = express.Router();

//Register Admin
router.post("/register", async (req, res) => {
  try {
    let adminData = req.body;
    await adminModel.create(adminData);
    res.status(200).json({ msg: "Book added sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete All Admin
router.delete("/delete-all", async (req, res) => {
  try {
    await adminModel.deleteMany();
    res.status(200).json({ msg: "All Books Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete Admin by IDelete by id
router.delete("/delete/:adminId", async (req, res) => {
  try {
    let id = req.params.adminId;
    let deletedadmin = await adminModel.findByIdAndDelete(id);
    if (!deletedadmin) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Book Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Update Admin by ID
router.put("/update/:adminId", async (req, res) => {
  try {
    let id = req.params.adminId;
    let updateData = req.body;
    let getadminData = await adminModel.findByIdAndUpdate(id, updateData);
    if (!getadminData) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Updated sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get All Admin
router.get("/all", async (req, res) => {
  try {
    let adminData = await adminModel.find({});
    res.status(200).json(adminData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get Nurse by ID
router.get("/:adminId", async (req, res) => {
  try {
    let id = req.params.adminId;
    let adminData = await adminModel.findById(id);
    res.status(200).json(adminData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

export default router;
