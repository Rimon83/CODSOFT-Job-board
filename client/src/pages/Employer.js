import React from 'react'
import { useLocation, Link, Outlet } from 'react-router-dom';

const Employer = () => {
  const {pathname} = useLocation()
  return (
    <div >
      <nav>
        <ul className="flex justify-start items-center">
          <li
            className={`${
              pathname === "/dashboard/employer/post-job" ? "underline" : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/employer/post-job"}>Post A job</Link>
          </li>
          <li
            className={`${
              pathname === "/dashboard/employer/my-post" ? "underline" : ""
            } text-black text-center ml-[2rem] p-1 rounded-l-sm`}
          >
            <Link to={"/dashboard/employer/my-post"}>My Post</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}

export default Employer