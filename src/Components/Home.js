import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout, fetchProjects } from "../store";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const { projects } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  // to verify projects are there with tasks included
  console.log(projects);

  return (
    <div>
      <h1>Home</h1>
      <div>
        Welcome {auth.username}!!
        <button onClick={() => dispatch(logout())}>Logout</button>
      </div>
    </div>
  );
};

export default Home;
