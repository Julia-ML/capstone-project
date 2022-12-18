import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const UserTasksGraph = (props) => {
  //props takes in all team tasks and user id
  console.log("props", props);
  const teamTasks = props.tasks;
  const userTasks = teamTasks.filter((task) => task.userId === props.id);
  const progress = userTasks.filter((task) => task.status === "In Progress");
  const done = userTasks.filter((task) => task.status === "Done");

  const data = [
    { name: "My To-Do", value: userTasks.length },
    { name: "In Progress", value: progress.length },
    { name: "Done", value: done.length },
  ];

  return (
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
  );
};

export default UserTasksGraph;
