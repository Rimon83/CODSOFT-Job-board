import React, { useEffect, useState } from "react";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import InputFormAnimation from "./InputFormAnimation";

const Form = ({
  title,
  handleSubmit,
  handleChange,
  userInput,
  buttonTitle,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  // get the pathname to determine is it login or register path
  const { pathname } = useLocation();

  // for register form to validate the password
  const [password, setPassword] = useState("");
  const [passwordLength, setPasswordLength] = useState(false);
  const [lowercaseValidate, setLowercaseValidate] = useState(false);
  const [uppercaseValidate, setUppercaseValidate] = useState(false);
  const [digitValidate, setDigitValidate] = useState(false);
  const [specialCharValid, setSpecialCharValid] = useState(false);

  const validatePassword = (password) => {
    const lowercaseRegex = new RegExp("(?=.*[a-z])");
    const uppercaseRegex = new RegExp("(?=.*[A-Z])");
    const digitRegex = new RegExp("(?=.*\\d)");
    const specialCharRegex = new RegExp("(?=.*[@$!%*?&])");

    const isLowercaseValid = lowercaseRegex.test(password);
    const isUppercaseValid = uppercaseRegex.test(password);
    const isDigitValid = digitRegex.test(password);
    const isSpecialCharValid = specialCharRegex.test(password);

    setPasswordLength(password && password.length >= 8);
    setLowercaseValidate(isLowercaseValid);
    setUppercaseValidate(isUppercaseValid);
    setDigitValidate(isDigitValid);
    setSpecialCharValid(isSpecialCharValid);
  };

  useEffect(() => {
    if (pathname === "/register") {
      validatePassword(password);
    }
  }, [password]);

  let validPassword = false;
  if (
    passwordLength &&
    lowercaseValidate &&
    uppercaseValidate &&
    digitValidate &&
    specialCharValid
  ) {
    validPassword = true;
  }

  // const handleChange = (ev) => {
  //  if (ev.target.name === "password"){
  //   setPassword(ev.target.value);
  //  }
  // }

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="p-[2rem] my-10 flex flex-col gap-6 justify-center items-center w-full  border-2 rounded-md bg-[#FAFAFA] shadow-lg">
      <h1 className="text-2xl text-slate-700 mt-[1rem] mb-[4rem]">{title}</h1>
      <form
        className="flex flex-col justify-center items-center gap-8 w-full"
        onSubmit={(ev) => handleSubmit(ev, validPassword)}
      >
        {/* Full name input  for register form*/}
        {pathname === "/register" && (
          <label className="text-sm w-full flex-1 relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-white">
            <input
              type="text"
              name="name"
              className="w-full h-10 outline-none peer bg-white p-2 text-gray-600 rounded-md focus:ring-2 focus:ring-emerald-500"
              value={userInput.name}
              onChange={(ev) => handleChange(ev)}
              required
            />
            <InputFormAnimation text="Full Name" stateValue={userInput.name} />
          </label>
        )}

        {/* email input */}
        <label className="text-sm w-full relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-white">
          <input
            type="email"
            name="email"
            value={userInput.email}
            className="w-full h-10 outline-none peer bg-white p-2 text-gray-600 rounded-md focus:ring-1 focus:ring-blue-400"
            onChange={(ev) => handleChange(ev)}
            required
          />
          <InputFormAnimation text="Email" stateValue={userInput.email} />
        </label>

        {/* password input */}
        <label className="text-sm w-full relative flex flex-col justify-end cursor-text border-2 rounded-md shadow-sm focus-within:shadow-md transition-shadow duration-300 group bg-white">
          <input
            type={!showPassword ? "text" : "password"}
            name="password"
            value={userInput.password}
            className="w-full h-10 outline-none peer bg-white p-2 text-gray-600 rounded-md focus:ring-1 focus:ring-blue-400"
            onChange={(ev) => {
              handleChange(ev);
              setPassword(ev.target.value);
            }}
            required
          />
          <div
            className="w-4 h-4 absolute top-[20%] right-[15px] cursor-pointer"
            onClick={togglePassword}
          >
            {showPassword ? (
              <IoEyeOutline size={20} />
            ) : (
              <IoEyeOffOutline size={20} />
            )}
          </div>
          <InputFormAnimation text="Password" stateValue={userInput.password} />
        </label>

        {/* for register form */}
        {pathname === "/register" && (
          <div className="text-sm flex flex-col gap-2 self-start ">
            <div className="flex gap-4 items-center ">
              <input
                type="checkbox"
                checked={passwordLength}
                className="w-4 h-4"
              />
              <p>At least 8 characters in length</p>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={lowercaseValidate}
                className="w-4 h-4"
              />
              <p>Contains at least one lowercase letter</p>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={uppercaseValidate}
                className="w-4 h-4"
              />
              <p>Contains at least one uppercase letter</p>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={digitValidate}
                className="w-4 h-4"
              />
              <p>Contains at least one digit</p>
            </div>

            <div className="flex gap-4 items-center">
              <input
                type="checkbox"
                checked={specialCharValid}
                className="w-4 h-4"
              />
              <p>
                Contains at least one special character from the set [@$!%*?&]
              </p>
            </div>
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-green-400 w-full hover:bg-green-300 hover:text-black text-white rounded mt-2"
        >
          {buttonTitle}
          {/* {buttonLoading ? "Loading ..." : "Sign in"} */}
        </button>
      </form>

      {/* for register form */}
      {pathname === "/register" && (
        <Link className="mt-4 self-end text-sm" to="/login">
          Already have an account?{" "}
          <span className="underline font-semibold hover:text-sky-800">
            Login
          </span>
        </Link>
      )}

      <Link to="/register" className="mt-4 self-end text-sm">
        Don&apos;t have an account?{" "}
        <span className="underline font-semibold hover:text-sky-800">
          Register
        </span>
      </Link>
    </div>
  );
};

export default Form;
