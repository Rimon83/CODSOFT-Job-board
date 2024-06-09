import React from "react";
import countriesData from "../dataConstant/countries.json";
import categoriesOptions from "../dataConstant/category.json";


const countries = countriesData.countries;
//get all categories
const categories = categoriesOptions.categories;



const SearchBar = ({searchData, setSearchData, handleSearchData}) => {
 const handleChange = (e) => {
  const {name, value} = e.target
  setSearchData(((prev) => ({
      ...prev,
      [name]: value,
    })))

 }
  return (
    <div className="flex justify-center items-center my-[4rem] p-4">
      <form
        onSubmit={handleSearchData}
        className="max-w-[80%] w-full flex lg:flex-row flex-col gap-4 justify-center items-center"
      >
        <input
          className="w-full p-1.5 bg-transparent text-gray-900 placeholder:text-gray-400 placeholder:text-[.8rem] rounded-md ring-2
           focus-within:bg-gray-100 ring-gray-300"
          type="text"
          name="keyword"
          placeholder="Search Keyword"
          value={searchData.keyword}
          onChange={handleChange}
        />

        <select
          className="w-full p-1.5 bg-transparent text-gray-600 text-sm rounded-md ring-2
          ring-gray-300 focus-within:bg-gray-100"
          name="location"
          value={searchData.location}
          onChange={handleChange}
        >
          <option  value={""} selected>
            Country
          </option>
          {countries.length > 0 &&
            countries.map((country, index) => (
              <option key={index + country} value={country.label}>
                {country.label}
              </option>
            ))}
        </select>
       
        <select
          className="w-full p-1.5 bg-transparent text-gray-600 rounded-md ring-2 text-sm
          ring-gray-300 focus-within:bg-gray-100"
          name="category"
          value={searchData.category}
          onChange={handleChange}
        >
          <option value={""} selected>
            Category
          </option>
          {categories.length > 0 &&
            categories.map((category, index) => (
              <option key={index + category} value={category.value}>
                {category.value}
              </option>
            ))}
        </select>

        <div className="lg:max-w-[200px] w-full">
          <button
            type="submit"
            className=" w-full px-4 py-2 bg-green-400 rounded-md hover:bg-green-300 hover:text-black text-white"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
