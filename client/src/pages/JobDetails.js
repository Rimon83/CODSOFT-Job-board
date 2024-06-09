import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { CiDollar } from "react-icons/ci";
import { TiShoppingBag } from "react-icons/ti";
import { CiCalendarDate } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"





const JobDetails = () => {
  const {email} = useSelector((state) => state.user)
  const location = useLocation()
  const jobList = location.state
  const {
    companyName,
    jobTitle,
    minPrice,
    maxPrice,
    hourly,
    jobLocation,
    createdAt,
    jobType,
    schedule,
    workEnvironment,
    experiences,
    duties,
    skills,
    description,
    path
  } = jobList;


  const param = useParams()
  const navigate = useNavigate()
  const handleApply = () => {
   
    if (email === jobList.email){
      toast.error("You can not apply for this job")
      return
    }

    navigate("/apply", {state:jobList})


  }


  // function to navigate to back home
  const handleBackHome = () => {
    navigate("/")

  }
  // calculate the number of days
  const current = new Date()
  const date = new Date(createdAt)
  const dayNumber =Math.floor((Math.abs(current.getTime() - date.getTime())) / (1000 * 60 * 60 * 24));

  return (
    <section className="bg-[#FAFAFA] p-2">
      <div
        className="fixed top-[9rem] left-[2rem] cursor-pointer "
        onClick={handleBackHome}
      >
        <IoIosArrowBack size={25} className="hover:opacity-[0.5]" />
      </div>
      <div className="lg:w-[50%] mx-auto w-full bg-white border-2 border-[#ededed] m-[3rem] lg:p-[3rem] p-[1rem] relative">
        <div>
          <h2 className="lg:text-lg text-base text-gray-600 mb-2 font-semibold">
            {jobTitle}
          </h2>
          <h4 className="text-base text-gray-400">{companyName}</h4>
          <h4 className="text-base text-gray-400">{jobLocation}</h4>
          <p className="text-base text-gray-400 mt-4">{dayNumber} day(s)</p>
        </div>

        <hr className="my-6" />

        <div className="flex flex-col gap-6">
          <h3 className="lg:text-2xl text-lg text-gray-800 font-bold mb-8">
            Job details
          </h3>

          <div className="flex flex-col gap-2 justify-center">
            <h4 className="flex items-center gap-4 font-semibold">
              <CiDollar />
              Pay
            </h4>
            <div className="flex gap-6">
              {/* min and max salary */}
              <div>
                {minPrice && maxPrice ? (
                  <span className="flex items-center ml-[1.5rem] bg-gray-200 w-fit p-1">
                    {minPrice}K-{maxPrice}K a year
                  </span>
                ) : (
                  <span className="flex items-center ml-[1.5rem] bg-gray-200 w-fit p-1">
                    {maxPrice}K a year
                  </span>
                )}
              </div>

              {/* hourly */}
              <div>
                {hourly && (
                  <span className="flex items-center ml-[1.5rem] bg-gray-200 w-fit p-1">
                    ${hourly.toFixed(2)} hourly
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <h4 className="flex items-center gap-4 font-semibold">
              <TiShoppingBag />
              Job type
            </h4>
            <p className=" ml-[2rem] bg-green-200 w-fit p-1">{jobType}</p>
          </div>

          <div className="flex flex-col gap-2 justify-center">
            <h4 className="flex items-center gap-4 font-semibold">
              <CiCalendarDate />
              Schedule
            </h4>
            <p className=" ml-[2rem] bg-green-200 w-fit p-1">{schedule}</p>
          </div>

          <div className="flex flex-col gap-2 justify-center mt-[1rem]">
            <h4 className="flex items-center font-semibold">
              Work Environment
            </h4>

            <p className=" ml-[2rem] bg-gray-200 w-fit p-1">
              {workEnvironment}
            </p>
          </div>
        </div>

        <hr className="my-6" />

        <div>
          <h3 className="lg:text-2xl text-lg text-gray-800 font-bold mb-8">
            Job description
          </h3>
          <div>{description}</div>

          {/* skills */}
          <div className="my-[2rem]">
            <h4 className="font-bold text-lg">Skills</h4>
            <ul className="p-[1rem] flex flex-col gap-1">
              {skills.length > 0 &&
                skills.map((skill, index) => (
                  <li className="list-disc" key={index}>
                    {skill.value}
                  </li>
                ))}
            </ul>
          </div>

          {/* eduction and experience */}
          <div className="my-[2rem]">
            <h4 className="font-bold text-lg">Education and Experience</h4>
            <ul className="p-[1rem] flex flex-col gap-1">
              {experiences.length > 0 &&
                experiences.map((experience, index) => (
                  <li className="list-disc" key={index}>
                    {experience}
                  </li>
                ))}
            </ul>
          </div>

          {/* duties */}
          <div className="my-[2rem]">
            <h4 className="font-bold text-lg">Duties and Responsibilities</h4>
            <ul className="p-[1rem] flex flex-col gap-1">
              {duties.length > 0 &&
                duties.map((duty, index) => (
                  <li className="list-disc" key={index}>
                    {duty}
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* button apply */}
        {path !== "/dashboard/seeker/applied-job" && (
            <div className="flex flex-col mt-[2rem] mx-auto max-w-[300px] w-full sticky bottom-0 z-50">
              <button
                className="px-4 py-2 bg-green-400 rounded-md hover:bg-green-300 hover:text-black text-white "
                type="button"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          )}
      </div>
    </section>
  );
}

export default JobDetails