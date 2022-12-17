import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, fetchTeams } from "../store";
import { useNavigate } from "react-router-dom";
import EmailSummary from "./EmailSummary";

const Home = () => {
  const { auth } = useSelector((state) => state);
  const { projects } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  useEffect(() => {
    dispatch(fetchProjects());
  }, []);

  return (
    <div>
      <div>My Dashboard for: {date.toDateString()}</div>
    </div>
  );
};

export default Home;
