import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Loading from '../components/Loading';
import CardJob from '../components/CardJob';

const BrowserJob = () => {
  const [savedJob, setSavedJob] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/all-post`;
  const USER_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;

  // get user saved job IDs
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: USER_URL,
        withCredentials: true,
      });
      setSavedJob(response.data.data.saved);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get all post jobs
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
    getUserDetails();
  }, []);

  // filtered saved job
const filteredJobs = jobs?.map((job) => ({
  ...job,
  saved: savedJob?.includes(String(job._id)),
}));

  return (
    <div className="flex justify-center max-w-screen-md mx-auto border-1 border-gray-300 shadow-md my-[2rem] rounded">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full py-[2rem]">
          <h3 className="ml-4 my-4text-lg font-semibold">
            {jobs.length} job(s)
          </h3>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <CardJob key={job._id} jobList={job} />)
          ) : (
            <p className="text-gray-400 text-base p-4">No Job matched</p>
          )}
        </div>
      )}
    </div>
  );
}

export default BrowserJob