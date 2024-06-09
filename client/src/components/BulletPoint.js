import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { GoDotFill } from "react-icons/go";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";




const BulletPoint = ({bulletPoints,setBulletPoints}) => {
  const [addCount, setAddCount] = useState(bulletPoints.length - 1)

  const handleAddBulletPoint = (index, ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    if (bulletPoints[index] === "") {
      toast.error("Please Type experience required");
      return;
    }
    setBulletPoints([...bulletPoints, ""]);
    setAddCount(addCount + 1)
  };

  const handleDeleteBulletPoint = (index, ev) => {
    bulletPoints.splice(index, 1);
    setAddCount(addCount - 1)
  };

  const handleBulletPointChange = (e, index) => {
    const updatedBulletPoints = [...bulletPoints];
    updatedBulletPoints[index] = e.target.value;
    setBulletPoints(updatedBulletPoints);
  };

  return (
    <div className="w-full">
      {bulletPoints.map((bulletPoint, index) => (
        <div
          className="flex justify-center items-center mb-[0.5rem] relative "
          key={index}
        >
          <input
            type="text"
            placeholder="Education and Experience required"
            value={bulletPoint}
            onChange={(e) => handleBulletPointChange(e, index)}
            className={`w-full px-8 py-1.5 rounded-l-sm placeholder:text-sm focus:ring-1 focus:ring-green-400 ${
              addCount === index
                ? "ring-1 ring-green-400"
                : "ring-1 ring-blue-400"
            }`}
          />
          <GoDotFill className="absolute left-2" />

          {addCount !== index && (
            <button
              className="px-3 py-[.7rem] bg-blue-400 rounded-r-sm "
              onClick={(ev) => handleDeleteBulletPoint(index, ev)}
            >
              <RiSubtractFill />
            </button>
          )}
          {addCount === index && (
            <button
              className="px-3 py-[.7rem] bg-green-400 hover:bg-green-300"
              onClick={(ev) => handleAddBulletPoint(index, ev)}
            >
              <MdAdd />
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BulletPoint;
