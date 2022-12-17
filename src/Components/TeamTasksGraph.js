import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const TeamTasksGraph = (props) => {
  //props takes in all team tasks and user id
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
                ? "#3ECA7F"
                : entry.name === "In Progress"
                ? "#CA3EC5"
                : "#3E7FCA"
            }
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default TeamTasksGraph;
