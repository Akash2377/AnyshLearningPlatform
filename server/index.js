const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const { connection } = require("./config/index.js");
const { AuthRouter } = require("./middleware/auth.js");
const { UserAuthRouter } = require("./middleware/userauth.js");
const { LearnRouter } = require("./middleware/learn.js");

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/auth", AuthRouter);
app.use("/user", UserAuthRouter);
app.use("/learn", LearnRouter);

app.get("/", (req, res) => {
  return res.status(200).send("DEV TECH EDUCATION");
});

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Listening on port 8080");
  } catch (error) {
    console.log(error.message);
  }
});
