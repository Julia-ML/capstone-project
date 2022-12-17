import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks, fetchProjects, fetchTeams } from "../store";
import TaskCard from "./TaskCard";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

const TaskGallery = () => {
	const { tasks, projects, teams } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [_tasks, setTasks] = useState([]);
	const [_users, setUsers] = useState([]);
	const [_projects, setProjects] = useState([]);
	const [projectFilter, setProjectFilter] = useState("");
	const [userFilter, setUserFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");

	useEffect(() => {
		dispatch(fetchTasks());
		dispatch(fetchProjects());
		dispatch(fetchTeams());
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

	useEffect(() => {
		if (projectFilter.length && userFilter.length && statusFilter.length) {
			setTasks(
				tasks.filter((task) => {
					return (
						task.projectId === projectFilter &&
						task.userId === userFilter &&
						task.status === statusFilter
					);
				})
			);
		} else if (
			projectFilter.length &&
			userFilter.length &&
			!statusFilter.length
		) {
			setTasks(
				tasks.filter((task) => {
					return task.projectId === projectFilter && task.userId === userFilter;
				})
			);
		} else if (
			projectFilter.length &&
			statusFilter.length &&
			!userFilter.length
		) {
			setTasks(
				tasks.filter((task) => {
					return (
						task.projectId === projectFilter && task.status === statusFilter
					);
				})
			);
		} else if (
			userFilter.length &&
			statusFilter.length &&
			!projectFilter.length
		) {
			setTasks(
				tasks.filter((task) => {
					return task.userId === userFilter && task.status === statusFilter;
				})
			);
		} else if (
			projectFilter.length &&
			!userFilter.length &&
			!statusFilter.length
		) {
			setTasks(
				tasks.filter((task) => {
					return task.projectId === projectFilter;
				})
			);
		} else if (
			userFilter.length &&
			!statusFilter.length &&
			!projectFilter.length
		) {
			setTasks(
				tasks.filter((task) => {
					return task.userId === userFilter;
				})
			);
		} else if (
			statusFilter.length &&
			!userFilter.length &&
			!projectFilter.length
		) {
			setTasks(
				tasks.filter((task) => {
					return task.status === statusFilter;
				})
			);
		} else {
			setTasks(tasks);
		}
	}, [projectFilter, userFilter, statusFilter]);

	const projectfilterChange = (ev) => {
		if (ev.target.value === "") {
			dispatch(fetchTasks());
			return;
		}
		const newId = ev.target.value.id;
		setProjectFilter(newId);
	};

	const userfilterChange = (ev) => {
		if (ev.target.value === "") {
			dispatch(fetchTasks());
			return;
		}
		const newId = ev.target.value.id;
		setUserFilter(newId);
	};

	const statusfilterChange = (ev) => {
		if (ev.target.value === "") {
			dispatch(fetchTasks());
			return;
		}
		const newId = ev.target.value;
		setStatusFilter(newId);
	};

	const clearFilters = () => {
		setStatusFilter("");
		setProjectFilter("");
		setUserFilter("");
	};

	return (
		<Container>
			<br />
			<Typography variant="h3" align="center">
				{teams.name} Tasks
			</Typography>
			<Grid container sx={{ display: "flex", justifyContent: "flex-start" }}>
				<Grid
					item
					sx={{ margin: "1rem", padding: "1rem", width: "200px" }}
					xs={3}
				>
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<Select
							variant="filled"
							onChange={projectfilterChange}
							defaultValue={""}
							value={projectFilter}
							id={"selectproject"}
							label={"Project"}
						>
							<MenuItem value={""} key={"none"}>
								<em>None</em>
							</MenuItem>
							{_projects.map((project) => {
								return (
									<MenuItem key={project.id} value={project}>
										{project.name}
									</MenuItem>
								);
							})}
						</Select>
						<FormHelperText>Filter by project</FormHelperText>
					</FormControl>
				</Grid>
				<Grid
					item
					sx={{ margin: "1rem", padding: "1rem", width: "200px" }}
					xs={3}
				>
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<Select
							variant="filled"
							onChange={userfilterChange}
							defaultValue={""}
							value={userFilter}
							id={"selectuser"}
							label={"name"}
						>
							<MenuItem value={""} key={"none"}>
								<em>None</em>
							</MenuItem>
							{_users.map((user) => {
								return (
									<MenuItem key={user.id} value={user}>
										{user.firstName}
									</MenuItem>
								);
							})}
						</Select>
						<FormHelperText>Filter by assigned team member</FormHelperText>
					</FormControl>
				</Grid>
				<Grid
					item
					sx={{ margin: "1rem", padding: "1rem", width: "200px" }}
					xs={3}
				>
					<FormControl sx={{ m: 1, minWidth: 200 }}>
						<Select
							variant="filled"
							onChange={statusfilterChange}
							defaultValue={""}
							value={statusFilter}
							id={"selectstatus"}
						>
							<MenuItem value={""} key={"none"}>
								<em>None</em>
							</MenuItem>
							<MenuItem value="Backlog" key={"Backlog"}>
								Backlog
							</MenuItem>
							<MenuItem value="To Do" key={"To Do"}>
								To Do
							</MenuItem>
							<MenuItem value="In Progress" key={"In Progress"}>
								In Progress
							</MenuItem>
							<MenuItem value="Done" key={"Done"}>
								Done
							</MenuItem>
						</Select>
						<FormHelperText>Filter by task status</FormHelperText>
					</FormControl>
				</Grid>
				<Grid
					item
					sx={{ margin: "1rem", padding: "1rem", width: "200px" }}
					xs={3}
				>
					<Button variant="contained" onClick={clearFilters}>
						Clear all filters
					</Button>
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
