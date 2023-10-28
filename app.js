import config from "config";
import express from "express";
import "./utils/dbconnect.js";

import userRouter from "./controllers/users/index.js"

const PORT = config.get("PORT");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello Server is Running 🚀");
});

app.use("/user",userRouter);

//error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found -Invalid Route");
  // next();
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${PORT} 🚀`);
});
