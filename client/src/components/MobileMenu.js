import React, { useState } from 'react'
import DropDown from './DropDown';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import axios from "axios"


const MobileMenu = ({isOpen, setIsOpen}) => {
  const pages = ["page1", "page2", "page3"];
  const blogs = ["blog1", "blog2", "blog3"];
  const [openMenus, setOpenMenus] = useState({
    Pages: false,
    Blogs: false,
    // Add more dropdown types as needed
  });
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
      console.log(error);
    }
  };

  const closeOtherMenus = (menuType) => {
    const updatedMenus = {};
    for (const key in openMenus) {
      if (key === menuType) {
        updatedMenus[key] = true;
      } else {
        updatedMenus[key] = false;
      }
    }
    setOpenMenus(updatedMenus);
  };

  const handleLinkAfterClicking = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <nav
        className={`absolute top-0 right-0 bottom-0 h-screen max-w-[50%] w-full bg-black text-white flex flex-col justify-center text-center py-5 duration-300 ease-in-out ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <ul className="flex flex-col gap-6 w-full ">
          <li className="hover:bg-gray-600 w-full p-2">
            <Link
              className="hover:opacity-[0.6] "
              to="/"
              onClick={handleLinkAfterClicking}
            >
              Home
            </Link>
          </li>
          <li className="hover:bg-gray-600 w-full p-2">
            <Link
              className="hover:opacity-[0.6]"
              to="/browse-job"
              onClick={handleLinkAfterClicking}
            >
              Browse Job
            </Link>
          </li>
          <li className="hover:bg-gray-600 p-2">
            <DropDown
              menuType="Pages"
              options={pages}
              closeOtherMenus={closeOtherMenus}
              openMenus={openMenus}
            />
          </li>
          <li className="hover:bg-gray-600 p-2">
            <DropDown
              menuType="Blogs"
              options={blogs}
              closeOtherMenus={closeOtherMenus}
              openMenus={openMenus}
            />
          </li>
          <li className="hover:bg-gray-600 w-full p-2">
            <Link
              className="hover:opacity-[0.6]"
              to="/contact"
              onClick={handleLinkAfterClicking}
            >
              Contact
            </Link>
          </li>

          <li className="hover:bg-gray-600 w-full p-2">
            <Link
              className="hover:opacity-[0.6]"
              to="/dashboard/employer/post-job"
              onClick={handleLinkAfterClicking}
            >
              Post A job
            </Link>
          </li>
          {user.email === "" && (
            <li className="p-2">
              <Link
                className=" py-1.5 px-3 mt-[1.5rem] border-2 border-gray-400 hover:bg-white/50  rounded"
                to="/login"
                onClick={handleLinkAfterClicking}
              >
                Login
              </Link>
            </li>
          )}
        </ul>
        {user.email !== "" && (
          <div className="p-2">
            <button
              className="px-3 py-1.5 mt-[1.5rem] border-2 border-gray-400 hover:bg-white/50  rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </div>
  );
}

export default MobileMenu