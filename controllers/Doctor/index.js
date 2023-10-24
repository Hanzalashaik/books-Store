import express from "express";
import doctorsModel from "../../models/doctor/Doctor.js";

let router = express.Router();

//Register Doctor
router.post("/doctor/register", async (req, res) => {
  try {
    let doctorData = req.body;
    await doctorsModel.create(doctorData);
    res.status(200).json({ msg: "Book added sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete All Doctor
router.delete("/doctor/delete-all", async (req, res) => {
  try {
    await doctorsModel.deleteMany();
    res.status(200).json({ msg: "All Books Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete Doctor by IDelete by id
router.delete("/doctor/delete/:doctorId", async (req, res) => {
  try {
    let id = req.params.nurseId;
    let deleteddoctor = await doctorsModel.findByIdAndDelete(id);
    if (!deleteddoctor) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Book Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Update Doctor by ID
router.put("/doctor/update/:doctorId", async (req, res) => {
  try {
    let id = req.params.nurseId;
    let updateData = req.body;
    let getdoctorData = await doctorsModel.findByIdAndUpdate(id, updateData);
    if (!getdoctorData) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Updated sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get All Doctor
router.get("/doctor/all", async (req, res) => {
  try {
    let doctorData = await doctorsModel.find({});
    res.status(200).json(doctorData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get Doctor by ID
router.get("/dcotor/:doctorId", async (req, res) => {
  try {
    let id = req.params.nurseId;
    let doctorData = await doctorsModel.findById(id);
    res.status(200).json(doctorData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

export default router;
