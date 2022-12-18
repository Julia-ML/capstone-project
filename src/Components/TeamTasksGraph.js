import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";
import Typography from "@mui/material/Typography";

const TeamTasksGraph = (props) => {
  //props takes in all team tasks
  console.log("props", props);
  const teamTasks = props.tasks;
  const progress = teamTasks.filter((task) => task.status === "In Progress");
  const done = teamTasks.filter((task) => task.status === "Done");

  const data = [
    { name: "Team To-Do", value: teamTasks.length },
    { name: "In Progress", value: progress.length },
    { name: "Done", value: done.length },
  ];

  return (
    <span>
      <Typography width="100%" align="center">
        Team Tasks
      </Typography>
      <PieChart width={730} height={250}>
        <Legend />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={70}
          innerRadius={40}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell
              key={entry.name}
              fill={
                entry.name === "Done"
                  ? "#eaece5"
                  : entry.name === "In Progress"
                  ? "#b2c2bf"
                  : "#5b9aa0"
              }
            />
          ))}
        </Pie>
      </PieChart>
    </span>
  );
};

export default TeamTasksGraph;
