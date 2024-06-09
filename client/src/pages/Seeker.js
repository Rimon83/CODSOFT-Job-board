import React from "react";
import { useLocation, Link, Outlet } from "react-router-dom";

const Seeker = () => {
  const { pathname } = useLocation();
  return (
    <div>
      <nav>
        <ul className="flex justify-start items-center">
          <li
            className={`${
              pathname === "/dashboard/seeker/applied-job" ? "underline" : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/seeker/applied-job"}>Applied</Link>
          </li>
          <li
            className={`${
              pathname === "/dashboard/seeker/saved-job" ? "underline" : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/seeker/saved-job"}>Saved</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default Seeker;
