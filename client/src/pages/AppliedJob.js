import React, { useEffect, useState } from 'react'
import axios from "axios"
import Loading from '../components/Loading';
import CardJob from '../components/CardJob';
import { useLocation } from 'react-router-dom';

const AppliedJob = () => {
  const [loading, setLoading] = useState(true);
  const [appliedJob, setAppliedJob] = useState([]);
  const [postJob, setPostJob] = useState([]);
  const {pathname} = useLocation()

  const USER_URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
  const POST_URL = `${process.env.REACT_APP_BACKEND_URL}/api/all-post`;

  // get user applied job IDs
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: USER_URL,
        withCredentials: true,
      });
      setAppliedJob(response.data.data.applied);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // get All post job 
  const getPostJobs = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: POST_URL,
        withCredentials: true,
      });
      setPostJob(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    getUserDetails();
    getPostJobs()
  }, []);

  // filtered applied job
 const filteredJobs = postJob.filter(({ _id }) =>
   appliedJob.includes(String(_id))
 );


  return (
    <div className="flex justify-center max-w-screen-md mx-auto border-1 border-gray-300 shadow-md my-[2rem] rounded">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full py-[2rem]">
          <h3 className="ml-4 my-4text-lg font-semibold">
            {filteredJobs.length} job(s)
          </h3>
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => <CardJob key={job._id} jobList={job} path={pathname}/>)
          ) : (
            <p className="text-gray-400 text-base p-4">No job applied yet</p>
          )}
        </div>
      )}
    </div>
  );
}

export default AppliedJob