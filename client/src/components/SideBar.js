import React, { useState } from 'react'
import RadioButton from './RadioButton';
import { RiMenuFold2Fill } from "react-icons/ri";


const SideBar = ({setRadioButtonValue}) => {
   const [openFilterMenu, setOpenFilterMenu] = useState(false);

 const salaryValues = ["Any", "< 30k", "< 50k", "< 75k", "< 100k"]
 const dateValues = ["All time", "Last 24 hours", "Last week", "Last month"]
 const jobTypeValues = ["All", "Full-time", "Part-time", "Temporary", "Contract"];

 const handleChange = (e) => {
      const { name, value } = e?.target;
      setRadioButtonValue((prev) => ({
        ...prev,
        [name]: value,
      }));
      setOpenFilterMenu(false);


 }

 
  return (
    <>
      <div className="relative lg:hidden">
        <div
          className=" p-4 w-full bg-[#FAFAFA] flex lg:hidden cursor-pointer"
          onClick={() => setOpenFilterMenu(!openFilterMenu)}
        >
          <RiMenuFold2Fill size={25} />
        </div>
        {/* for mobile */}
        <div
          className={`bg-[#FAFAFA] rounded p-[2rem] lg:hidden absolute ease-in-out duration-300 ${
            openFilterMenu ? "block" : "hidden"
          }`}
        >
          <h2 className="text-xl font-bold">Filter</h2>
          <RadioButton
            title="Salary"
            values={salaryValues}
            name="salary"
            handleChange={handleChange}
          />
          <RadioButton
            title="Date posted"
            values={dateValues}
            name="date"
            handleChange={handleChange}
          />
          <RadioButton
            title="Job Type"
            values={jobTypeValues}
            name="jobType"
            handleChange={handleChange}
          />
        </div>
      </div>

      <section className="bg-white rounded p-[2rem] lg:block hidden">
        <h2 className="text-xl font-bold">Filter</h2>
        <RadioButton
          title="Salary"
          values={salaryValues}
          name="salary"
          handleChange={handleChange}
        />
        <RadioButton
          title="Date posted"
          values={dateValues}
          name="date"
          handleChange={handleChange}
        />
        <RadioButton
          title="Job Type"
          values={jobTypeValues}
          name="jobType"
          handleChange={handleChange}
        />
      </section>
    </>
  );
}

export default SideBar