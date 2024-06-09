import Post from "../database/models/postJob.js";

const deletePost = async (req, res) => {
  try {
    const { _id } = req.body;
    const postById = await Post.deleteOne(
      { _id: _id }   
    );


    return res.json({
      message: "Job deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default deletePost;
