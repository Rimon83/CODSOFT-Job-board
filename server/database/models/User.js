import mongoose from "mongoose";

const resumeDetails = new mongoose.Schema({
  fileName : String,
  url : String,
})


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "provide name"],
    },
    email: {
      type: String,
      required: [true, "provide email"],
    },
    password: {
      type: String,
      required: [true, "provide password"],
    },
    resume: {
      type: [resumeDetails],
    },

    applied: [{
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    }],
    
    saved: [{
      type: mongoose.Schema.ObjectId,
      ref: "Post",
    }],
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
