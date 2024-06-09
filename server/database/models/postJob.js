import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: [true, "provide job title"],
    },

    companyName: {
      type: String,
      required: [true, "provide company name"],
    },

    jobLocation: {
      type: String,
      required: [true, "provide job location"],
    },

    minPrice: {
      type: Number,
    },

    maxPrice: {
      type: Number,
    },

    hourly: {
      type: Number,
    },

    jobType: {
      type: String,
      required: [true, "provide job type"],
    },

    schedule: {
      type: String,
      required: [true, "provide job schedule"],
    },

    workEnvironment: {
      type: String,
    },

    category: {
      type: String,
    },

    skills: {
      type: [],
    },

    experiences: {
      type: [],
    },

    duties: {
      type: [],
    },

    description: {
      type: String,
    },

    email: {
      type: String,
    },
  },
  { timestamps: true }
);
const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
