import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
  {
    Name: {
      type: string,
    },
    Email: {
      type: string,
    },
    Mobile: {
      type: Number,
    },
    Password: {
      type: String,
    },
    Role: {
      type: String,
    },
    CourseId: [mongoose.Types.ObjectId],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
const userModel = mongoose.model("user", userSchema, "users");
export default userModel;
