import React, { useState } from "react";
// import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link } from "react-router-dom";

const DropDown = ({ menuType, options, closeOtherMenus, openMenus }) => {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = (e) => {
    setOpenMenu(!openMenu);
    closeOtherMenus(menuType);

  };
  

  return (
    <div className="relative w-full">
      <div className="flex gap-1 justify-center items-center cursor-pointer hover:opacity-[0.6]">
        <button>{menuType}</button>
        <MdKeyboardArrowDown onClick={handleOpenMenu} />
        {/* <MdOutlineKeyboardArrowUp /> */}
      </div>

      <div
        className={`absolute bg-gray-100 flex flex-col text-center gap-2 z-50 my-2 py-2 max-w-[150px] text-black transition-all ease-in-out rounded-md  top-6 -left-[.25rem] w-full ${
          openMenu && openMenus[menuType] ? "block" : "hidden"
        }`}
      >
        {options.length > 0 &&
          options.map((option, index) => (
            <div key={index} className="hover:bg-gray-200 w-full">
              <Link to={`/${option}`}>{option}</Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DropDown;
