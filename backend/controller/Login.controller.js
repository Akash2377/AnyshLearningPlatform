import express from "express";
import userModel from "../model/user.model";
const LoginRouter = express.Router();

userRouter.post("/Login", async (req, res) => {
  try {
    const data = req.body;
    const user = await userModel.find(data);
    res.send("Login");
  } catch (error) {
    res.send({ message: error.message });
  }
});
export default userRouter;
