import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setUser } from "../redux/userSlice";
import Loading from "../components/Loading";

const LayoutRoot = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const URL = `${process.env.REACT_APP_BACKEND_URL}/api/user-details`;
  const getUserDetails = async () => {
    try {
      setLoading(true);
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/login");
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return <div>{loading ? <Loading /> : <div>{children}</div>}</div>;
};

export default LayoutRoot;
