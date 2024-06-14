import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import countriesData from "../dataConstant/countries.json";
import CreatableSelect from "react-select/creatable";
import skills from "../dataConstant/skills.json";
import categoriesOptions from "../dataConstant/category.json";
import BulletPoint from "../components/BulletPoint";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//get all countries
const countries = countriesData.countries;

//get all skills
const SkillOptions = skills.options;

//get all categories
const categories = categoriesOptions.categories;

const PostJob = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //skills
  const [selectedOption, setSelectedOption] = useState();
  // experiences
  const [experienceBulletPoints, setExperienceBulletPoints] = useState([""]);
  // duties
  const [dutiesBulletPoints, setDutiesBulletPoints] = useState([""]);
  const { email } = useSelector((state) => state.user);
  const formRef = useRef()
  const navigate = useNavigate()
  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/create-post`;

  const onSubmit = async (data) => {
    data.skills = selectedOption;
    data.experiences = experienceBulletPoints;
    data.duties = dutiesBulletPoints;
    data.email = email;

    try {
      const response = await axios({
        method: "POST",
        url: URL,
        data: data,
        withCredentials: true,
      });


      if (response.data.success) {
        toast.success(response.data.message)
        formRef.current.reset()
        setExperienceBulletPoints([""])
        setSelectedOption([{}])
        setDutiesBulletPoints([""])
        navigate("/job-search");

      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl container mx-auto px-4 lg:p-[2rem]">
      <div className="bg-[#FAFAFA] p-8">
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="flex flex-col justify-center items-center gap-6 w-full">
            <div className="flex lg:flex-row flex-col w-full gap-6">
              {/* job title */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full ">
                Job Title
                <input
                  type="text"
                  {...register("jobTitle", { required: true })}
                  placeholder="Ex. software developer"
                  className="post_job_input"
                />
              </label>
              {/* company name */}
              <label className="mb-2 lg:text-lg text-base text-gray-600 flex flex-col gap-2 w-full">
                Company Name
                <input
                  type="text"
                  {...register("companyName", { required: true })}
                  placeholder="Ex. Google"
                  className="post_job_input"
                />
              </label>
              {/* job location */}
              <label className=" lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Job Location
                <select
                  {...register("jobLocation")}
                  className="post_job_input"
                >
                  {countries.length > 0 &&
                    countries.map((country, index) => (
                      <option key={index + country} value={country.label}>
                        {country.label}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="flex lg:flex-row flex-col w-full gap-6">
              {/* min salary */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Min Salary
                <input
                  type="text"
                  {...register("minPrice", { required: true })}
                  placeholder="Ex. 40"
                  className="post_job_input"
                />
              </label>
              {/* max salary */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Max Salary
                <input
                  type="text"
                  {...register("maxPrice", { required: true })}
                  placeholder="Ex. 80"
                  className="post_job_input"
                />
              </label>

              {/* pay hourly */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Hourly
                <input
                  type="text"
                  {...register("hourly", { required: true })}
                  placeholder="Ex.15.00"
                  className="post_job_input"
                />
              </label>
            </div>

            <div className="flex lg:flex-row flex-col w-full gap-6">
              {/* work style */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Job Type
                <select
                  {...register("jobType")}
                  className="post_job_input"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Temporary">Temporary</option>
                  <option value="Contract">Contract</option>
                </select>
              </label>

              {/* job schedule */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full ">
                Schedule
                <input
                  type="text"
                  {...register("schedule", { required: true })}
                  placeholder="Ex. Monday-Friday"
                  className="post_job_input"
                />
              </label>

              {/* work Environment */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Work Environment
                <select
                  {...register("workEnvironment")}
                  className="post_job_input"
                >
                  <option value="Work remotely">Work remotely</option>
                  <option value="In person">In person</option>
                </select>
              </label>
            </div>

            <div className="flex lg:flex-row flex-col w-full gap-6">
              {/* job category */}
              <label className=" lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Job Category
                <select
                  {...register("category")}
                  className="post_job_input"
                >
                  {categories.length > 0 &&
                    categories.map((category, index) => (
                      <option key={index + category} value={category.value}>
                        {category.value}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            <div className="flex lg:flex-row flex-col w-full gap-6">
              {/* skills requirement */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Skills requirements
                <CreatableSelect
                  isMulti
                  defaultValue={selectedOption}
                  options={SkillOptions}
                  onChange={setSelectedOption}
                />
              </label>
            </div>

            <div className="flex lg:flex-row flex-col w-full gap-6">
              {/* eduction and experience  */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Education and experience
                <BulletPoint
                  bulletPoints={experienceBulletPoints}
                  setBulletPoints={setExperienceBulletPoints}
                />
              </label>

              {/* Duties  */}
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Responsibilities and Duties
                <BulletPoint
                  bulletPoints={dutiesBulletPoints}
                  setBulletPoints={setDutiesBulletPoints}
                />
              </label>
            </div>

            {/* description */}
            <div className="flex lg:flex-row flex-col w-full gap-6">
              <label className="lg:text-lg text-base mb-2 text-gray-600 flex flex-col gap-2 w-full">
                Description
                <textarea
                  {...register("description")}
                  rows={10}
                  placeholder="Type about the company"
                  className="px-3 py-4 w-full focus:outline-none"
                />
              </label>
            </div>
          </div>
          <button className="my-[2rem] bg-green-400 rounded px-8 py-2 cursor-pointer hover:bg-green-300 hover:text-black text-white"
            type="submit"
          >Create</button>
        </form>
      </div>
    </div>
  );
};

export default PostJob;
