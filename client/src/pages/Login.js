import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import axios from "axios";
import Form from "../components/Form";
import { useSelector } from "react-redux";

const Login = () => {
    const {email} = useSelector((state) => state.user);

  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // check if the there is a token 
  console.log(email)
  if (email){
    navigate("/dashboard/profile")
    return
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/login`;
      const res = await axios({
        method: "post",
        url: URL,
        data: userInput,
        withCredentials: true,
      });

      const data = await res.data;

      if (data.success) {
        navigate("/dashboard/profile");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="max-w-screen-md w-full mx-auto lg:p-[2rem] p-[1rem] h-screen flex items-center">
      <Form
        title={"Login to your account"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        userInput={userInput}
        buttonTitle={"Sign in"}
      />
    </section>
  );
};

export default Login;
