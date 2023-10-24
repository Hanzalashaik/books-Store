import config from "config";
import express from "express";
import adminRouter from "./controllers/Admin/index.js";
import doctorRouter from "./controllers/Doctor/index.js"
import nurseRouter from "./controllers/Nurse/index.js"
import patientRouter from "./controllers/Patient/index.js"
import "./utils/dbconnect.js";

const PORT = config.get("PORT");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello Server is Running 🚀");
});

app.use("/admin", adminRouter);
app.use("/", doctorRouter);
app.use("/", nurseRouter);
app.use("/", patientRouter);


//error handler
app.use((req, res, next) => {
  res.status(404).send("Not Found -Invalid Route");
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running at port ${POST} 🚀`);
});
