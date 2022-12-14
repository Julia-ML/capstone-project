const schedule = require("node-schedule");

const logger = async (Project, Task, Log) => {
  const projects = await Project.findAll();
  const tasks = await Task.findAll();

  for (let i of projects) {
    const projectTasks = tasks.filter((task) => task.projectId === i.id);
    const doneTasks = projectTasks
      ? projectTasks.filter((task) => task.status === "Done")
      : [];
    const percent = doneTasks.length / projectTasks.length;
    Log.create({ date: Date(), value: percent, projectId: i.id });
  }
};

module.exports = logger;
