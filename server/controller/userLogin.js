import User from "../database/models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";



const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    // check email
    if (!user) {
      return res.status(400).json({
        message: "email is not exist",
        error: true,
      });
    }

    // check password
    const verifyPassword = await bcryptjs.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Please check password",
        error: true,
      });
    }

    // return res.status(200).json({
    //   message: "Login successfully",
    //   success: true,
    // });

     const tokenData = {
       id: user._id,
       email: user.email,
     };


     // for token
     const token = await jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
       expiresIn: "1d",
     });

     // for cookies
     const cookieOptions = {
       httpOnly: true,
       secure: true,
     };
      return res.cookie("token", token, cookieOptions).status(200).json({
       message: "Login successfully",
       success: true,
       token: token,
     });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default userLogin;
