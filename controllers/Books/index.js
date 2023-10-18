import express from "express";
import booksModel from "../../models/Books.js";

let router = express.Router();

//post
router.post("/post", async (req, res) => {
  try {
    let bookData = req.body;
    await booksModel.create(bookData);
    res.status(200).json({ msg: "Book added sucessfully" });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//get
router.get("/get", async (req, res) => {
  try {
    let bookData = await booksModel.find({});
    res.status(200).json(bookData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//get by id
router.get("/getbyid/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let bookData = await booksModel.findById(id);
    res.status(200).json(bookData);
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//update by id
router.put("/update/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let updateData = req.body;
    let getbookData = await booksModel.findByIdAndUpdate(id, updateData);
    if (!getbookData) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Updated sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//delete by id
router.delete("/delete/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let deletedBook = await booksModel.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book Not found" });
    }
    res.status(200).json({ msg: "Book Deleted Sucessfully..." });
  } catch (error) {
    res.status(500).json({ msg: "Internel server error" });
  }
});

//delete many
router.delete("/deleteall",async(req,res)=>{
    try {
        await booksModel.deleteMany();
        res.status(200).json({msg:"All Books Deleted Sucessfully..."})
    } catch (error) {
        res.status(500).json({ msg: "Internel server error" });
    }
})

export default router;
