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

const graph = (log) => {
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
      <Bar dataKey="total" fill="#3E7FCA" />
      <Bar dataKey="done" fill="#82ca9d" />
    </BarChart>
  );
};

export default graph;
