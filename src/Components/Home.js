import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects } from "../store";
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
      <div>
        My Dashboard
      </div>
    </div>
  );
};

export default Home;
