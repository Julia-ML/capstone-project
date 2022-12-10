 import React from "react";
 const schedule = require("node-schedule");

const trackingDone = (projectTasks) => {
    

 const rule = new schedule.RecurrenceRule();
 
  const dataPoints = [];
  //rule.hour = 0;
  rule.minute = [new schedule.Range(0, 59)];
  
  const job = schedule.scheduleJob(rule, function () {
    const numberDone = projectTasks.filter(task => task.status === 'Done').length;
    if(dataPoints.length>=25){dataPoints = dataPoints.slice(1)}
    dataPoints.push(numberDone);
    console.log(dataPoints);
    
    return dataPoints
  });
  
};

export default trackingDone; 