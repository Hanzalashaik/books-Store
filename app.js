import config from "config";
import express from "express";
import booksRouter from "./controllers/Books/index.js";
import "./utils/dbconnect.js";

const POST = config.get("POST");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello Server is Running 🚀");
});

app.use("/books", booksRouter);


//error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found -Invalid Route");
});

app.listen(POST, (req, res) => {
  console.log(`Server is running at port ${POST} 🚀`);
});
