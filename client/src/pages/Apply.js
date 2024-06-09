import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import uploadFile from "../helper/uploadFile";
import toast from "react-hot-toast";
import axios from "axios";
import { setUser } from "../redux/userSlice";
import { useLocation, useNavigate } from "react-router-dom";

const Apply = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    resume: [
      {
        fileName: "",
        url: "",
      },
    ],
  });
  const { email, name, resume } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const uploadResumeRef = useRef();
  const [resumeLoading, setResumeLoading] = useState()
  const navigate = useNavigate()
  const {state} = useLocation()


 

  useEffect(() => {
    if (email !== "" || name !== "" || resume.length > 0)
    setUserInfo({
      name,
      email,
      resume,
    });
  }, [name, email, resume]);

  useEffect(() => {
    if (resumeLoading) {
      const urlArray = resumeLoading?.url.split(".");
      const fileType = resumeLoading?.original_filename + "." + urlArray.pop();
      
      setUserInfo((prev) => {
        return {
          ...prev,
          resume:[{ fileName: fileType, url: resumeLoading?.url }],
        };
      });
    }
  }, [resumeLoading])

  //upload resume

  const handleOpenUploadResume = (e) => {
    e.preventDefault();
    e.stopPropagation();

    uploadResumeRef?.current?.click();
  };

  const handleUploadResume = async (e) => {

    const file = e.target.files[0];

    const uploadResume = await uploadFile(file);
    if (uploadResume) {
      setResumeLoading(uploadResume)
      toast.success("Resume uploaded successfully");
    } else {
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
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-info`;
    const EMAIL_URL = `${process.env.REACT_APP_BACKEND_URL}/api/send-email`;


    try {
      const response = await axios({
        method: "post",
        url: URL,
        data: {userInfo, state},
        withCredentials: true,
      });

      const data = await response.data.data;

      if (response.data.success) {
        toast.success("Your Application is sent successfully")
        dispatch(setUser(data));
        navigate("/")
      }

      // handle send email
      const emailResponse = await axios({
        method: "post",
        url: EMAIL_URL,
        data: {email: email, companyName: state.companyName, jobTitle: state.jobTitle},
        withCredentials: true,
      });


     

    } catch (error) {
      console.log(error);
      toast.error();
    }
  };



  return (
    <div className="max-w-screen-md mx-auto bg-[#FAFAFA] h-screen my-[2rem] p-4">
      <h3 className="text-center text-lg font-bold">Review your information</h3>
      <div className="w-full flex flex-col justify-start  gap-6 p-[3rem]">
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

            {userInfo?.resume?.length > 0 && (
              <div className="text-lg text-blue-500 font-semibold">
                <h3>
                  <a href={userInfo?.resume[0]?.url} download={resume[0]?.fileName}>
                    {userInfo?.resume[0]?.fileName}
                  </a>
                </h3>
              </div>
            )}
            <label>
              {/* upload resume */}

              <button
                className="font-semibold border-1 px-4 py-1.5 bg-slate-200 rounded mt-[2rem] hover:bg-slate-100"
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
            <button
              className="my-[2rem] bg-green-400 rounded px-8 py-2 cursor-pointer hover:bg-green-300 hover:text-black text-white"
              type="submit"
            >
              Apply
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Apply;
