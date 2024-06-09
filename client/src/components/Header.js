import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { RiMenu5Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import MobileMenu from "./MobileMenu";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import axios from "axios"
import { logout} from "../redux/userSlice";


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleOpenMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleAvatarOpen = () => {
    setIsAvatarOpen(!isAvatarOpen)
  }
  const user = useSelector((state) => state.user);

  // handle logout
  const handleLogout = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/logout`;
   try {
     const response = await axios({
       url: URL,
       withCredentials: true,
     });


     if (response.data.success) {
       dispatch(logout());
       navigate("/");
     }
   } catch (error) {
    console.log(error)
   }
  }

  


  return (
    <>
      <div className=" bg-blue-500 p-[2rem] text-white flex justify-between mb-0 border-0 outline-0 sticky top-0 left-0 right-0 z-50">
        <div className="flex justify-center items-center gap-4">
          <div className="border-2 border-green-400 rounded-full p-1">
            <div className="rounded-full bg-green-400 p-2 outline-4 outline-green-400">
              <CiSearch size={25} style={{ color: "white" }} />
            </div>
          </div>
          <div className="flex flex-col gap-1 justify-center items-center">
            <h2 className="lg:text-[1.50rem] text-sm font-semibold">
              Job Board
            </h2>
            <p className="lg:text-[.75rem] text-[0.4rem]">
              Find your dream job
            </p>
          </div>
        </div>
        <Navbar />

        {user.email !== "" ? (
          <div
            className="relative cursor-pointer lg:block hidden"
            onClick={handleAvatarOpen}
          >
            <Avatar name={user.name} width={50} height={50} textSize={1} />
            <div
              className={`absolute right-[.5rem] top-[4rem] bg-[#FAFAFA] text-black px-[3rem] py-[2rem] rounded transition-all ease-in-out duration-300 ${
                isAvatarOpen ? "block" : "hidden"
              }`}
            >
              <h2 className="text-gray-600 text-md text-nowrap mb-[1.5rem]">
                Hello {user.name.split(" ")[0]}
              </h2>
              <hr className="border-1 border-gray-300 w-full mb-[1.5rem]" />
              <ul className="flex flex-col gap-3 text-gray-500">
                <li className="text-nowrap hover:text-gray-400">
                  <Link to={"/dashboard/profile"}>Profile</Link>
                </li>
                <li className="text-nowrap hover:text-gray-400">
                  <Link to={"dashboard/employer/post-job"}>Post A job</Link>
                </li>
              </ul>
              <button
                className="px-4 py-1.5 bg-green-400 mt-[1.5rem] hover:bg-green-300 rounded"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="lg:flex hidden gap-6 justify-center items-center">
            <Link className="hover:opacity-[0.6]" to="/login">
              Login
            </Link>
            <Link
              className="px-4 py-2 bg-green-400 rounded-md hover:bg-green-300 hover:text-black"
              to="/dashboard/employer/post-job"
            >
              Post A job
            </Link>
          </div>
        )}

        {/* burger menu for mobile */}
        <div className="lg:hidden flex mt-[.75rem] cursor-pointer">
          {!isOpen ? (
            <RiMenu5Line className="w-5 h-5" onClick={handleOpenMenu} />
          ) : (
            <IoMdClose className="w-5 h-5" onClick={handleOpenMenu} />
          )}
        </div>
      </div>

      {/* mobile menu */}
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Header;
