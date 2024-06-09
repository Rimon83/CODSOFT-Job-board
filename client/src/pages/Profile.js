import React, { useEffect, useRef, useState } from "react";
import Avatar from "../components/Avatar";
import { useSelector } from "react-redux";
import { useDispatch} from "react-redux";
import uploadFile from "../helper/uploadFile";
import toast from "react-hot-toast"
import axios from "axios"
import { setUser } from "../redux/userSlice";
import { Link } from "react-router-dom";




const Profile = () => {
  let { name, email,resume } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    resume: [{
      fileName:"",
      url: ""
    }]

  })
    const dispatch = useDispatch()
    const uploadResumeRef = useRef()
      const [resumeLoading, setResumeLoading] = useState();


    useEffect(() =>{
      setUserInfo({
        name,
        email, 
        resume
      })
    }, [name, email, resume])

    useEffect(() => {
      if (resumeLoading) {
        const urlArray = resumeLoading?.url.split(".");
        const fileType =
          resumeLoading?.original_filename + "." + urlArray.pop();

        setUserInfo((prev) => {
          return {
            ...prev,
            resume: [{ fileName: fileType, url: resumeLoading?.url }],
          };
        });
      }
    }, [resumeLoading]);
   
    //upload resume

    const handleOpenUploadResume = (e) => {
      e.preventDefault();
      e.stopPropagation();

      uploadResumeRef?.current?.click();
    };

     const handleUploadResume = async (e) => {
    const file = e.target.files[0];

    const uploadResume = await uploadFile(file);
    if (uploadResume){
      setResumeLoading(uploadResume);

    //   const urlArray = uploadResume?.url.split(".")
    //   const fileType = uploadResume.original_filename +"." + urlArray.pop()
    // setUserInfo((prev) => {
    //   return {
    //     ...prev,
    //     resume: [{fileName: fileType,url: uploadResume?.url}],
    //   };
    // });

    toast.success("Resume uploaded successfully")
  }else{
        toast.error("Resume not uploaded");


  }

  };

   const handleChange = (e) => {
     const { name, value } = e.target;

     setUserInfo((prev) => {
       return {
         ...prev,
         [name]: value,
       };
     });
   };


 
// handle submit info
  const handleSubmit = async (e) => {
     e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-info`;

      const response = await axios({
        method: "post",
        url: URL,
        data: {userInfo},
        withCredentials: true,
      });

      toast.success(response?.data?.message);

      if (response.data.success) {
        dispatch(setUser(response.data.data));
      }
    } catch (error) {
      console.log(error);
      toast.error();
    }
   

    
  };

  return (
    <div className="flex justify-around my-[2rem] gap-6 p-[2rem] bg-[#FAFAFA]">
      <div className="mt-[1rem]">
        <Avatar name={name} width={100} height={100} textSize={3} />
      </div>

      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full mt-[2rem] flex flex-col gap-6">
          <label className="w-full flex flex-col gap-2 text-gray-500">
            Full Name
            <input
              type="text"
              value={userInfo.name}
              name="name"
              onChange={handleChange}
              className="w-full ring-1 ring-gray-300 py-1.5 px-2 rounded bg-white"
            />
          </label>
          <label className="w-full flex flex-col gap-2 text-gray-500">
            Email
            <input
              type="text"
              value={userInfo.email}
              name="email"
              onChange={handleChange}
              className="w-full ring-1 ring-gray-300 py-1.5 px-2 rounded bg-white"
            />
          </label>


          {userInfo.resume.length > 0 && (
            <div className="text-lg text-blue-500 font-semibold">
              <h3>
                <a
                  href={userInfo.resume[0].url}
                  download={userInfo.resume[0].fileName}
                >
                  {userInfo.resume[0].fileName}
                </a>
              </h3>
            </div>
          )}
          <label>
            {/* upload resume */}

            <button
              className="font-semibold border-1 px-4 py-1.5 bg-slate-200 rounded mt-[2rem]"
              onClick={handleOpenUploadResume}
            >
              Upload resume
            </button>
            <input
              type="file"
              className="hidden"
              onChange={handleUploadResume}
              ref={uploadResumeRef}
            />
          </label>
          <div>
            <button
              className=" my-[2rem] bg-green-400 rounded px-8 py-2 cursor-pointer hover:bg-green-300 hover:text-black text-white"
              type="submit"
            >
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Profile;
