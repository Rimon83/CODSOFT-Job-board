import express from "express";
import userRegister from "../controller/userRegister.js"
import userLogin from "../controller/userLogin.js"
import getUserInfoFromToken from "../controller/getUserDetails.js";
import userLogout from "../controller/userLogout.js";
import updateUserInfo from "../controller/updateUserInfo.js";
import createPost from "../controller/createPost.js";
import getAllPost from "../controller/getAllPost.js";
import editPost from "../controller/editPost.js";
import deletePost from "../controller/deletePost.js";
import sendEmail from "../controller/sendEmail.js";



const router = express.Router();
//create user registration api
router.post("/register", userRegister);

// login user
router.post("/login", userLogin)

// logout user
router.get("/logout", userLogout)

// get user details
router.get("/user-details", getUserInfoFromToken)

// update user info
router.post("/update-info", updateUserInfo);

// create new post
router.post("/create-post", createPost)

//get all post
router.get("/all-post", getAllPost)

// edit job post
router.put("/update-job", editPost)

// delete job post
router.delete("/delete-job", deletePost)

// send email
router.post("/send-email", sendEmail)



export default router