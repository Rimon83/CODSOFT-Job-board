import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const {pathname} = useLocation()
  
  
  return (
    <div className="bg-[#FAFAFA] py-[3rem] grid lg:grid-cols-6 h-screen">
      {/* for mobile */}
      <div className="lg:hidden flex  ">
        <ul className="lg:text-lg w-full flex justify-center items-center gap-4">
          <li
            className={`${
              pathname === "/dashboard/profile" ? "bg-green-300" : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm rounded`}
          >
            <Link to={"/dashboard/profile"}>Profile</Link>
          </li>

          <li
            className={`${
              pathname === "/dashboard/employer/post-job" ||
              pathname === "/dashboard/employer/edit-post" ||
              pathname === "/dashboard/employer/my-post"
                ? "bg-green-300"
                : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm rounded`}
          >
            <Link to={"/dashboard/employer/post-job"}>Employer</Link>
          </li>

          <li
            className={`${
              pathname === "/dashboard/seeker/applied-job" ||
              pathname === "/dashboard/seeker/saved-job"
                ? "bg-green-300"
                : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm rounded`}
          >
            <Link to={"/dashboard/seeker/applied-job"}>Seeker</Link>
          </li>
        </ul>
      </div>

      <div className="bg-blue-400 py-[2rem] text-white lg:block hidden">
        <ul className="lg:text-lg w-full flex flex-col gap-4">
          <li
            className={`${
              pathname === "/dashboard/profile" ? "bg-white" : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/profile"}>Profile</Link>
          </li>

          <li
            className={`${
              pathname === "/dashboard/employer/post-job" ||
              pathname === "/dashboard/employer/edit-post" ||
              pathname === "/dashboard/employer/my-post"
                ? "bg-white"
                : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/employer/post-job"}>Employer</Link>
          </li>

          <li
            className={`${
              pathname === "/dashboard/seeker/applied-job" ||
              pathname === "/dashboard/seeker/saved-job"
                ? "bg-white"
                : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/seeker/applied-job"}>Seeker</Link>
          </li>
        </ul>
      </div>
      <div className="col-span-4 bg-white rounded p-4 w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
