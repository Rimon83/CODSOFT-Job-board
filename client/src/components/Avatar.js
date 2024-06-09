import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const Avatar = ({ name, width, height, textSize }) => {

  // take the first letter of each first and last name
  let avatarName = "";

  if (name) {
    const splitName = name?.split(" ");


    if (splitName.length > 1) {
      avatarName = splitName[0][0] + splitName[1][0];

    } else {
      avatarName = splitName[0][0];
    }
  }


  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
  ];

  const randomNumber = Math.floor(Math.random() * 9);


  return (
    <div
      className={`pb-[.4rem] rounded-full flex justify-center items-center text-black font-bold ${bgColor[randomNumber]}`}
      style={{
        width: width + "px",
        height: height + "px",
        fontSize: `${textSize}rem`,
      }}
    >
      {name ? <h3>{avatarName}</h3> : <FaRegUserCircle size={width} />}
    </div>
  );
};

export default Avatar;
