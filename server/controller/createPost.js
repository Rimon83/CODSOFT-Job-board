import Post from "../database/models/postJob.js";

const createPost = async (req, res) => {
  try {
    const {
      jobTitle,
      companyName,
      jobLocation,
      minPrice,
      maxPrice,
      hourly,
      jobType,
      schedule,
      workEnvironment,
      category,
      skills,
      experiences,
      duties,
      description,
      email
    } = req.body;


   
    

    // create new post and save it to DB
    const newPost = new Post({
      jobTitle,
      companyName,
      jobLocation,
      minPrice,
      maxPrice,
      hourly,
      jobType,
      schedule,
      workEnvironment,
      category,
      skills,
      experiences,
      duties,
      description,
      email
    });
    const postSave = await newPost.save();
    return res.status(201).json({
      message: "Job post is created successfully",
      data: postSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default createPost;
