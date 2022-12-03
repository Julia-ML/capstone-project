import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchProjects } from "../store";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const { projects } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome {auth.username}!!
        <button
          onClick={() => {
            dispatch(logout());
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
