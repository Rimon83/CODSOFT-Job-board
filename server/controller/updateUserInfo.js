import User from "../database/models/User.js";
import checkToken from "../helper/checkToken.js";

const updateUserInfo = async (req, res) => {
  try {
    const token = req.cookies.token || "";
    const user = await checkToken(token);

    const { userInfo, state, saved } = req.body;

    let appliedList;
    let savedList;

let updateUser
    updateUser = await User.updateOne(
      { _id: user._id },
      {
        name:userInfo?.name,
        email: userInfo?.email,
        resume: userInfo?.resume
      }
    );
            const userInformation = await User.findById(user._id);


    appliedList = userInformation.applied;
    savedList = userInformation.saved


    // saved job
    if (state && saved === false || state && saved === true) {

      if (!saved){
        savedList = [...savedList, state]

      }else{
        const index = savedList.indexOf(String(state._id))
        savedList.splice(index, 1)
      }
       updateUser = await User.updateOne(
         { _id: user._id },
         {
           saved: savedList,
         }
       );
    }


    // applied job
    if (state && userInfo) {
      appliedList = [...appliedList, state];
       updateUser = await User.updateOne(
        { _id: user._id },
        {
          applied: appliedList,
        }
      );
    }


    return res.json({
      message: "user update successfully",
      data: userInformation,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

export default updateUserInfo;
