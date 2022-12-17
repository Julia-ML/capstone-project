import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, fetchTeams, fetchTasks } from "../store";
import { useNavigate } from "react-router-dom";
import UserTasksGraph from "./UserTasksGraph";
import TeamTasksGraph from "./TeamTasksGraph";

const Home = () => {
  const { auth, tasks, projects } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = new Date();
  useEffect(() => {
    dispatch(fetchProjects()), dispatch(fetchTasks());
  }, []);

  return (
    <div>
      <div>My Dashboard for: {date.toDateString()}</div>
      {tasks && auth ? <UserTasksGraph tasks={tasks} id={auth.id} /> : ""}
      {tasks && auth ? <TeamTasksGraph tasks={tasks} id={auth.id} /> : ""}
    </div>
  );
};

export default Home;
