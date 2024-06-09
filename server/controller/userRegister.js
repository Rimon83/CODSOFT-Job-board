import User from "../database/models/User.js";
import bcryptjs from "bcryptjs";

const registerUser = async (req, res) => {
  try {
    const { name, email, password} = req.body;
    const checkEmail = await User.findOne({ email });

    // check if the user exists in DB
    if (checkEmail) {
      return res.status(400).json({
        message: "Already user exists",
        error: true,
      });
    }

    // encrypt the password before saving to DB
    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    // create new user and save it to DB
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    const userSave = await newUser.save();
    return res.status(201).json({
      message: "User created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default registerUser;
