import express from "express";
import patientsModel from "../../models/patient/Patient.js";

let router = express.Router();

//Register Patient
router.post("/patient/register", async (req, res) => {
  try {
    let patientData = req.body;
    await patientsModel.create(patientData);
    res.status(200).json({ msg: "Book added sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete All Patient
router.delete("/patient/delete-all", async (req, res) => {
  try {
    await patientsModel.deleteMany();
    res.status(200).json({ msg: "All Books Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Delete Patient by IDelete by id
router.delete("/patient/delete/:patientId", async (req, res) => {
  try {
    let id = req.params.patientId;
    let deletedpatient = await patientsModel.findByIdAndDelete(id);
    if (!deletedpatient) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Book Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Update Patient by ID
router.put("/patient/update/:patientId", async (req, res) => {
  try {
    let id = req.params.patientId;
    let updateData = req.body;
    let getpatientData = await patientsModel.findByIdAndUpdate(id, updateData);
    if (!getpatientData) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Updated sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get All Patient
router.get("/patient/all", async (req, res) => {
  try {
    let patientData = await patientsModel.find({});
    res.status(200).json(patientData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//Get Patient by ID
router.get("/patient/:patientId", async (req, res) => {
  try {
    let id = req.params.patientId;
    let patientData = await patientsModel.findById(id);
    res.status(200).json(patientData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

export default router;
