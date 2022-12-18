import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

const DoneGraph = (props) => {
  const log = props.log;
  if (log.length > 7) {
    log = log.slice(-7);
  }
  const data = [];
  log.forEach(function (logItem) {
    let date = logItem.date.slice(5, 10);
    // date[2] = "/"; //should be like mm/dd
    data.push({ date: date, total: logItem.total, done: logItem.value });
  });

  return (
    <BarChart data={data} width={800} height={200}>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="total" fill="#5b9aa0" />
      <Bar dataKey="done" fill="#b2c2bf" />
    </BarChart>
  );
};

export default DoneGraph;
