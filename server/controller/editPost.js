import Post from "../database/models/postJob.js";

const editPost = async (req, res) => {
  try {
   const {_id} = req.body
    const postById = await Post.updateOne(
      { _id: _id },
      {
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
      }
    );
    if (!postById) {
      return res.status(400).json({
        message: "There is no job match",
        error: true,
      });
    }

     return res.json({
       message: "Job updated successfully",
       success: true,
     });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default editPost;
