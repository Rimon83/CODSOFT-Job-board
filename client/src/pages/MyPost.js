import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from "axios"
import Loading from "../components/Loading.js"
import { MdOutlineDelete } from "react-icons/md";
import { withSwal } from "react-sweetalert2";



const MyPost = ({ swal }) => {
  const { email } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/all-post`;
  const getAllPost = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      if (response.data.success) {
        const jobPosts = response.data.data;
        const jobFiltered = jobPosts.filter((job) => job.email === email);
        setJobs(jobFiltered);
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

 

  // handle delete click
  const handleDeleteClick = (job) => {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/delete-job`;

     swal
       .fire({
         title: "Are you sure?",
         text: `Do you want to delete ${job.jobTitle}`,
         showCancelButton: true,
         cancelButtonText: "Cancel",
         confirmButtonText: "Delete",
         reverseButtons: true,
         showLoaderOnConfirm: true, 
       })
       .then(async (result) => {
         if (result.isConfirmed) {
           try {
             const res = await axios(URL, {
               method: "DELETE",
               url: URL,
              data: {_id:job._id},
               withCredentials: true,
             });
             if (res.data.success) {
               swal.fire("Deleted", res.data.message, "success");
               
               await getAllPost();
             } else {
               // Handle failure to delete
               swal.fire("Error", res.data.message, "error");
             }
           } catch (error) {
             // Handle fetch errors
             swal.fire(
               "Error",
               "An error occurred while deleting the job",
               "error"
             );
           }
         }
       });
  };

  return (
    <div className="max-w-screen-xl mx-auto bg-[#FAFAFA] p-[2rem] mt-[2rem]">
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full bg-white rounded p-4 ">
          <p className="mt-[1rem] mb-[2rem] font-semibold">
            {jobs.length} job(s)
          </p>
          {jobs.length > 0 ? (
            jobs.map((job, index) => (
              <>
                <div
                  className="w-full flex lg:flex-row flex-col justify-around items-center lg:p-4 "
                  key={job._id}
                >
                  <div className='flex w-full gap-10'>
                    <div className=" w-full flex flex-col gap-1 text-gray-500 ">
                      <h3 className="font-bold text-nowrap">{job.jobTitle}</h3>
                      <p>{job.companyName}</p>
                      <p>{job.jobLocation}</p>
                    </div>
                    <div className=" w-full flex flex-col gap-1 text-gray-500 text-sm">
                      <h3 className="">{job.jobType}</h3>
                      <p>{job.workEnvironment}</p>
                      <p>{job.schedule}</p>
                    </div>
                  </div>

                  <div className="flex justify-center items-center gap-4 mt-[2rem] lg:mt-0">
                   
                    <button
                      onClick={() => handleDeleteClick(job)}
                      className="flex gap-1 items-center bg-red-300  px-4 py-1.5 rounded hover:bg-red-200 text-sm"
                    >
                      <MdOutlineDelete />
                      delete
                    </button>
                  </div>
                </div>
                <hr className="border-1 border-gray-400 my-[2rem]"/>
              </>
            ))
          ) : (
            <div className="h-screen text-lg">No job post</div>
          )}
        </div>
      )}
    </div>
  );
};

export default withSwal(MyPost);




 