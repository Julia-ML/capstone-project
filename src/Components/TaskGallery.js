import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, fetchUsers, fetchProjects, fetchTeams } from "../store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TaskCard from "./TaskCard";

const TaskGallery = () => {
	const { tasks, projects, users } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [_tasks, setTasks] = useState([]);
	const [_users, setUsers] = useState([]);
	const [_projects, setProjects] = useState([]);

	useEffect(() => {
		dispatch(fetchTasks());
		dispatch(fetchUsers());
		dispatch(fetchProjects());
		dispatch(fetchTeams());
	}, []);

	useEffect(() => {
		if (tasks[0] !== undefined) {
			setTasks(tasks);
			if (projects[0] !== undefined) {
				setProjects(projects);
			}
			if (users[0] !== undefined) {
				setUsers(users);
			}
		}
	}, [tasks, projects, users]);

	return (
		<Container>
			<Typography variant="h3">Team Tasks</Typography>
			<Grid
				container
				spacing={3}
				sx={{
					margin: "1rem",
					padding: "1rem",
				}}
			>
				{_tasks.map((task) => {
					const project = _projects.find(
						(project) => project.id === task.projectId
					);
					const user = _users.find((user) => user.id === task.userId);
					return (
						<TaskCard task={task} project={project} user={user} key={task.id} />
					);
				})}
			</Grid>
		</Container>
	);
};

export default TaskGallery;
