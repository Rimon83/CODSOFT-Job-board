import React, { useState } from "react";
import { CiLocationOn } from "react-icons/ci";
import { CiClock2 } from "react-icons/ci";
import { CiCalendarDate } from "react-icons/ci";
import { TiShoppingBag } from "react-icons/ti";
import { CiDollar } from "react-icons/ci";
import { useLocation, useNavigate } from "react-router-dom";
import getFormattedDate from "../helper/getFormatDate";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast"
import axios from "axios"





const CardJob = ({ jobList, path}) => {
  const {pathname} = useLocation()
  const {email} = useSelector((state) => state.user)
  const {
    _id,
    companyName,
    jobTitle,
    minPrice,
    maxPrice,
    jobLocation,
    createdAt,
    jobType,
    schedule,
    workLocation,
    description,
    saved,
  } = jobList;
  const navigate = useNavigate();

  //format the date of order
 const [bookMark, setBookMark] = useState(saved || false)

  const formattedDate = getFormattedDate(createdAt);
  const jobWithPathName = {...jobList,path:path}

  
  const handleCardClick = () => {
    navigate(`/job-details/${_id}`, { state: jobWithPathName });
  };

  const handleBookMark = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (!email){
      navigate("/login")
      return
    }
        const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update-info`;

    if (jobList.email === email){
      toast.error("You can't save this job ")
      return
    }
    setBookMark(!bookMark)

    if (pathname === "/dashboard/seeker/saved-job"){
      window.location.reload()
    }
      try {
        const response = await axios({
          method: "post",
          url: URL,
          data: { state: jobList, saved: bookMark },
          withCredentials: true,
        });

        const data = await response.data.data;
      } catch (error) {
        console.log(error);
        toast.error();
      }
  }
  return (
    <section
      className="p-[1.5rem] border-2 border-[#ededed] m-[1.5rem] rounded cursor-pointer hover:scale-105 duration-150 flex flex-col"
      onClick={handleCardClick}
    >
      <div className="self-end">
        {bookMark ? (
          <button onClick={handleBookMark}>
            <FaBookmark size={20} />
          </button>
        ) : (
          <button onClick={handleBookMark}>
            <FaRegBookmark size={20} />
          </button>
        )}
      </div>
    
      {/* company name and job title */}
      <div>
        <h3 className="text-lg font-semibold text-gray-600 mb-1">{jobTitle}</h3>
        <h4 className="mb-2 text-gray-500">{companyName}</h4>
      </div>
      {/* location, salary, and posting date */}
      <div className="flex flex-wrap gap-4 mb-2 text-gray-400 text-sm">
        <span className="flex items-center gap-1">
          <CiLocationOn />
          {jobLocation}
        </span>

        <span className="flex items-center gap-1">
          <TiShoppingBag />
          {jobType}
        </span>

        <span className="flex items-center gap-1">
          <CiClock2 />
          {schedule}
        </span>
        {minPrice && maxPrice ? (
          <span className="flex items-center gap-1">
            <CiDollar />
            {minPrice}K-{maxPrice}K a year
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <CiDollar />
            {maxPrice}K a year
          </span>
        )}

        <span className="flex items-center gap-1">
          <CiCalendarDate />
          {formattedDate}
        </span>
      </div>
      <div className="flex mb-2 text-gray-500">
        <p>{workLocation}</p>
      </div>
      {/* description of job */}
      <div className="text-base text-gray-500 mb-2">
        <p className="text-base text-gray-500 line-clamp-3">{description}</p>
      </div>
    </section>
  );
};

export default CardJob;
