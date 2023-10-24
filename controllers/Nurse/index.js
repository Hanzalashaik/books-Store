import express from "express";
import nursesModel from "../../models/nurse/Nurse.js";

let router = express.Router();

//Register Nurses
router.post("/nurse/register", async (req, res) => {
  try {
    let nurseData = req.body;
    await nursesModel.create(nurseData);
    res.status(200).json({ msg: "Book added sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete All Nurses
router.delete("/nurse/delete-all", async (req, res) => {
  try {
    await nursesModel.deleteMany();
    res.status(200).json({ msg: "All Books Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete Nurse by IDelete by id
router.delete("/nurse/delete/:nurseId", async (req, res) => {
  try {
    let id = req.params.nurseId;
    let deletednurse = await nursesModel.findByIdAndDelete(id);
    if (!deletednurse) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Book Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Update Nurse by ID
router.put("/nurse/update/:nurseId", async (req, res) => {
  try {
    let id = req.params.nurseId;
    let updateData = req.body;
    let getnurseData = await nursesModel.findByIdAndUpdate(id, updateData);
    if (!getnurseData) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Updated sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get All Nurses
router.get("/nurse/all", async (req, res) => {
  try {
    let nurseData = await nursesModel.find({});
    res.status(200).json(nurseData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get Nurse by ID
router.get("/nurse/:nurseId", async (req, res) => {
  try {
    let id = req.params.nurseId;
    let nurseData = await nursesModel.findById(id);
    res.status(200).json(nurseData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

export default router;
