import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, fetchUsers, fetchProjects, fetchTeams } from "../store";
import TaskCard from "./TaskCard";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const TaskGallery = () => {
	const { tasks, projects, auth, teams, users } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [_tasks, setTasks] = useState([]);
	const [team, setTeam] = useState({});
	const [_users, setUsers] = useState([]);
	const [_projects, setProjects] = useState([]);

	useEffect(() => {
		dispatch(fetchTasks());
		dispatch(fetchProjects());
		dispatch(fetchTeams());
		dispatch(fetchUsers());
	}, []);

	useEffect(() => {
		if (tasks[0] !== undefined) {
			setTasks(tasks);
			if (projects[0] !== undefined) {
				setProjects(projects);
			}
		}
		if (teams.users) {
			setUsers(teams.users);
		}
	}, [tasks, projects, teams]);

	// Create the select boxes first
	// Create the onChange functions to change project, user, status
	/*
		Method for filtering multiple layers on one page
		- If a project is selected, filter by project first
		- If a status is selected, filter by status next
		- If a user is selected, filter by user
		if (projectFilter) (
			_tasks.filter((task)=>{return task.projectId === projectFilter})
		)
		
	*/
	console.log(auth.teamId, "logging auth");
	console.log(teams.users, "logging team users");
	console.log(_users, "logging users");

	return (
		<Container>
			<Typography variant='h3'>Team Tasks</Typography>
			<Grid container>
				<Grid item sx={{ border: 1, margin: "1rem", padding: "1rem" }}>
					<Typography variant='subtitle1'>
						<ul>
							{_projects.map((project) => {
								return <li key={project.id}>{project.name}</li>;
							})}
						</ul>
					</Typography>
				</Grid>
				<Grid item sx={{ border: 1, margin: "1rem", padding: "1rem" }}>
					<Typography variant='subtitle1'>Filter Status</Typography>
				</Grid>
				<Grid
					item
					sx={{ border: 1, margin: "1rem", padding: "1rem", width: "300px" }}
				>
					<Typography variant='subtitle1'>
						<ul>
							{_users.map((user) => {
								return <li key={user.id}>{user.firstName}</li>;
							})}
						</ul>
					</Typography>
				</Grid>
			</Grid>
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
