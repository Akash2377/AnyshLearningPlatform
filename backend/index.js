import express from "express";
import connection from "./config/connection.js";
import cors from "cors";
import LoginRouter from "./controller/Login.controller.js";
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/user", LoginRouter);
app.get("/", async (req, res) => {
  res.send("hi");
});

app.listen(port, async () => {
  try {
    await connection();
    console.log(`server listening on ${port}`);
  } catch (error) {
    console.log(error);
  }
});
