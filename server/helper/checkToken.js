import jwt from "jsonwebtoken";
import User from "../database/models/User.js";

// check the token if it exists
const checkToken = async (token) => {
  if (!token) {
    return {
      message: "session out",
      logout: true,
    };
  }

  const decode = await jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await User.findById(decode.id).select("-password");
  return user;
};

export default checkToken;
