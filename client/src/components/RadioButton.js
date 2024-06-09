import React from 'react'

const RadioButton = ({ title, values, name, handleChange}) => {
 const handleClickRadioButton = (e) => {
  handleChange(e)

  
 }
  return (
    <div className="mb-[2rem]">
      <h3 className="mt-[2rem] mb-[1rem] text-lg font-semibold">{title}</h3>
      <div className="flex flex-col gap-2">
        {values.length > 0 &&
          values.map((value, index) => (
            <label
              key={index}
              className="w-full flex items-center gap-4  text-gray-500 cursor-pointer"
            >
              <input
                type="radio"
                value={value}
                name={name}
                onChange={handleClickRadioButton}
                className="w-[1rem] h-[1rem] cursor-pointer"
              />
              {value}
            </label>
          ))}
      </div>
    </div>
  );
};

export default RadioButton