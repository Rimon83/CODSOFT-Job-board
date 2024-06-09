import checkToken from "../helper/checkToken.js";

const getUserInfoFromToken = async (req, res) => {
  try {
    
    const token = req?.cookies?.token || "";
    const user = await checkToken(token);
    return res.status(200).json({ message: "user details", data: user });
  } catch (error) {
    return res
      .status(500)
      .json({ message: error.message || error, error: true });
  }
};

export default getUserInfoFromToken;
