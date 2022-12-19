import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import EmailSummary from "./EmailSummary";
import UserTasksGraph from "./UserTasksGraph";
import TeamTasksGraph from "./TeamTasksGraph";
import { fetchTasks, fetchProjects } from "../store";

const Metrics = () => {
  const { auth, tasks } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects()), dispatch(fetchTasks());
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {tasks && auth ? <UserTasksGraph tasks={tasks} id={auth.id} /> : ""}
      {tasks && auth ? <TeamTasksGraph tasks={tasks} id={auth.id} /> : ""}
    </div>
  );
};

export default Metrics;
