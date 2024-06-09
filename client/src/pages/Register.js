import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../components/Form";

const Register = () => {
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

  const handleSubmit = async (e, validPassword) => {
    e.preventDefault();
    if (!validPassword) {
      toast.error("The password doesn't match the criteria ");
      return;
    }
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/register`;

      const res = await axios({
        method: "post",
        url: URL,
        data: userInput,
        withCredentials: true,
      });

      const data = await res.data;

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <section className="max-w-screen-md w-full mx-auto lg:p-[2rem] p-[1rem] h-screen flex items-center">
      <Form
        title={"Create Account"}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        userInput={userInput}
        buttonTitle={"Register"}
      />
    </section>
  );
};

export default Register;
