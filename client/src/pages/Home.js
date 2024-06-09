import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CardJob from "../components/CardJob";
import SideBar from "../components/SideBar";
import axios from "axios";

const Home = () => {
  //create object to hold search data (title, location, category)
  const [searchData, setSearchData] = useState({
    keyword: "",
    location: "",
    category: "",
  });

  // hold all jobs in database
  const [jobList, setJobList] = useState([]);
  const [jobListDivided, setJobListDivided] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/all-post`;

  // filter the job list based on salary and date
  const [radioButtonValue, setRadioButtonValue] = useState({
    salary: "",
    date: "",
    jobType: "",
  });

  // state to hold the current page
  const [currentPage, setCurrentPage] = useState(1);
  let jobsNumberPerPage = 6;

  //calculate the start index and end index function
  const startEndIndex = () => {
    let startIndex = (currentPage - 1) * jobsNumberPerPage;
    let endIndex = startIndex + jobsNumberPerPage;
    return { startIndex, endIndex };
  };

  // next page function
  const nextPage = () => {
    if (currentPage < Math.ceil(jobList.length / jobsNumberPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // previous page function
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  let salary = parseInt(radioButtonValue.salary.split(" ")[1]);
  let dateString = radioButtonValue.date;

  // function to filter the job list based on salary
  const filteredSalaryProcess = (filteredJobs) => {
    // filter the job list based on salary
    if (salary) {
      if (salary === "Any") {
        filteredJobs = jobs;
      } else {
        filteredJobs = filteredJobs.filter(
          (jobSalary) => parseInt(jobSalary.maxPrice) < salary
        );
      }
    }
    return filteredJobs;
  };

  // function to filter the job list based on dates
  const filteredDatesProcess = (filteredJobs) => {
    if (dateString) {
      if (dateString === "Last 24 hours") {
        filteredJobs = filteredJobs.filter((jobDate) => {
          let oneDayBefore = Date.now() - 1000 * 60 * 60 * 24; //86400000;
          if (oneDayBefore < new Date(jobDate.createdAt).getTime()) {
            return true;
          } else {
            return false;
          }
        });
      } else if (dateString === "Last week") {
        filteredJobs = filteredJobs.filter((jobDate) => {
          let oneWeekBefore = Date.now() - 7 * (1000 * 60 * 60 * 24);
          if (oneWeekBefore < new Date(jobDate.createdAt).getTime()) {
            return true;
          } else {
            return false;
          }
        });
      } else if (dateString === "Last month") {
        filteredJobs = filteredJobs.filter((jobDate) => {
          let oneMonthBefore = Date.now() - 30 * (1000 * 60 * 60 * 24);
          if (oneMonthBefore < new Date(jobDate.createdAt).getTime()) {
            return true;
          } else {
            return false;
          }
        });
      }
    }
    return filteredJobs;
  };

  const getAllPost = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      if (response.data.success) {
        const jobPosts = response.data.data;
        setJobs(jobPosts);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllPost();
  }, []);

  // useEffect(() => {
  //   fetch("jobs.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.length > 0) {
  //         setJobs(data);
  //       }
  //     });
  // }, [jobs]);

  let { startIndex, endIndex } = startEndIndex();

  useEffect(() => {
    const dataProcess = () => {
      // filter the job list based on search data
      let filteredJobs = jobs.filter((job) => {
        return (
          job.jobTitle
            .toLowerCase()
            .includes(searchData?.keyword?.toLowerCase()) &&
          job.jobLocation
            .toLowerCase()
            .includes(searchData?.location?.toLowerCase()) &&
          job.category
            .toLowerCase()
            .includes(searchData?.category?.toLowerCase())
        );
      });

      filteredJobs = filteredSalaryProcess(filteredJobs);
      filteredJobs = filteredDatesProcess(filteredJobs);

      // filter job list based on job type

      if (radioButtonValue.jobType) {
        if (radioButtonValue.jobType === "All") {
          filteredJobs = jobs;
        } else {
          filteredJobs = filteredJobs.filter(
            ({ jobType }) =>
              jobType.toLowerCase() === radioButtonValue.jobType.toLowerCase()
          );
        }
      }

      setJobList(filteredJobs);
      //  let jobListLength = filteredJobs.length;
      let pageDivided = jobList.slice(startIndex, endIndex);
      setJobListDivided(pageDivided);
    };

    dataProcess();
  }, [endIndex, startIndex, radioButtonValue, jobList]);

  // function to handle submit search date to server
  const handleSearchData = (e) => {
    e.preventDefault();
    getAllPost()
     let filteredJobs = jobs.filter((job) => {
       return (
         job.jobTitle
           .toLowerCase()
           .includes(searchData?.keyword?.toLowerCase()) &&
         job.jobLocation
           .toLowerCase()
           .includes(searchData?.location?.toLowerCase()) &&
         job.category
           .toLowerCase()
           .includes(searchData?.category?.toLowerCase())
       );
     });
           setJobList(filteredJobs);
           

  };


  return (
    <>
      <div
        className="bg-blue-500 lg:h-[25rem] flex lg:flex-row flex-col lg:justify-around justify-center items-center
       text-white p-[3rem] mt-0 border-0 outline-0"
      >
        <div className="flex flex-col gap-2 py-[4rem]">
          <h3 className="text-md">4536+ jobs listed</h3>
          <h1 className="lg:text-5xl text-2xl font-semibold">
            Find your Dream Job
          </h1>
          <p className="text-sm">
            We provide instant cash loans with quick approval that suit your
            term length
          </p>
          <div className="my-[2rem]">
            <Link
              className="px-4 py-2 bg-green-400 rounded-md hover:bg-green-300 hover:text-black"
              to="/dashboard/profile"
            >
              Upload Your Resume
            </Link>
          </div>
        </div>

        {/* image section */}
        <div className="lg:mt-[10.5rem] mt-[2rem]">
          <img src="images/home-image.png" alt="welcome image" />
        </div>
      </div>

      {/* search bar */}
      <div>
        <SearchBar
          searchData={searchData}
          setSearchData={setSearchData}
          handleSearchData={handleSearchData}
        />
      </div>

      {/* filter and display job list */}

      <div className="bg-[#FAFAFA] lg:px-[6rem] py-[3rem] grid lg:grid-cols-4 gap-8">
        {/* side bar left */}
        <SideBar setRadioButtonValue={setRadioButtonValue} />
        <div className="col-span-2 bg-white rounded p-4">
          <h3 className="text-lg font-semibold">{jobList.length} job(s)</h3>
          {jobListDivided.length > 0 ? (
            jobListDivided?.map((job) => <CardJob key={job.id} jobList={job} />)
          ) : jobList.length > 0 ? (
            jobList?.map((job) => <CardJob key={job.id} jobList={job} />)
          ) : (
            <p className="text-gray-400 text-base">No Job matched</p>
          )}

          {/* Next Prev button */}

          {jobList.length > 0 && (
            <div className="flex justify-around items-center my-[2rem] text-gray-500">
              <button
                onClick={prevPage}
                className="px-4 py-2 bg-green-300 rounded hover:bg-green-200"
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <span className="text-sm font-bold">
                Page {currentPage}/
                {Math.ceil(jobList.length / jobsNumberPerPage)}
              </span>
              <button
                onClick={nextPage}
                className="px-4 py-2 bg-green-300 rounded hover:bg-green-200"
                disabled={currentPage === jobList.length / jobsNumberPerPage}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
