
import Post from "../database/models/postJob.js"

const getAllPost = async (req, res) => {
 try {
  const allPost = await Post.find({}).sort({ createdAt: -1 });  //1 -- asc  ,  -1 ---desc
  if(!allPost){
   return res.status(400).json({
     message: "There is no job",
     error: true,
   });
  }

  return res.status(200).json({
    success: true,
    data: allPost,
  });
  
 } catch (error) {
  return res.status(500).json({
    message: error.message || error,
    error: true,
  });
  
 }

}

export default getAllPost