import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const serverDB = process.env.DB_SERVER;
const connection = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await mongoose.connect(serverDB);
      console.log("Connected to Mongoose");
      resolve();
    } catch (error) {
      console.log(error);
      reject();
    }
  });
};
export default connection;
