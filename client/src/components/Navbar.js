import React, { useState } from 'react'
import { Link} from "react-router-dom";
import DropDown from './DropDown';


const Navbar = () => {
  const pages = ["page1", "page2", "page3"]
  const blogs = ["blog1", "blog2", "blog3"]
  const [openMenus, setOpenMenus] = useState({
    Pages: false,
    Blogs: false,
    // Add more dropdown types as needed
  });

  const closeOtherMenus = (menuType) => {
    const updatedMenus = {};
    for (const key in openMenus) {
      if (key === menuType) {
        updatedMenus[key] = true;
      } else {
        updatedMenus[key] = false;
      }
    }
    setOpenMenus(updatedMenus);
  };


  return (
    <div className="lg:flex hidden gap-8 justify-center items-center text-sm mt-[2rem]">
      <div>
        <Link className="hover:opacity-[0.6]" to="/">
          Home
        </Link>
      </div>
      <div>
        <Link className="hover:opacity-[0.6]" to="/job-search">
          Browse Job
        </Link>
      </div>
      <div>
        <DropDown
          menuType="Pages"
          options={pages}
          closeOtherMenus={closeOtherMenus}
          openMenus={openMenus}
        />
      </div>
      <div>
        <DropDown
          menuType="Blogs"
          options={blogs}
          closeOtherMenus={closeOtherMenus}
          openMenus={openMenus}
        />
      </div>
      <div>
        <Link className="hover:opacity-[0.6]" to="/contact">
          Contact
        </Link>
      </div>
    </div>
  );
}

export default Navbar