import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "../store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TaskCard from "./TaskCard";

const TaskGallery = () => {
	const { tasks } = useSelector((state) => state);
	const dispatch = useDispatch();
	const [_tasks, setTasks] = useState([]);

	useEffect(() => {
		dispatch(fetchTasks());
	}, []);

	useEffect(() => {
		if (tasks[0] !== undefined) {
			setTasks(tasks);
		}
	}, [tasks]);

	return (
		<Container>
			<Typography variant="h3">Team Tasks</Typography>
			<Grid
				container
				xs={12}
				spacing={3}
				sx={{
					margin: "1rem",
					padding: "1rem",
				}}
			>
				{_tasks.map((task) => {
					return <TaskCard task={task} key={task.id} />;
				})}
			</Grid>
		</Container>
	);
};

export default TaskGallery;
