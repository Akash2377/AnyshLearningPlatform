import express from "express";
import connection from "./config/connection.js";
import cors from "cors";
const port = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.get("/", async (req, res) => {
  res.send("hi");
});
app.listen(port, async () => {
  try {
    await connection();
    console.log("start server");
  } catch (error) {
    console.log(error);
  }
});
