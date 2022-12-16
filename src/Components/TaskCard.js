import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProjects, fetchUsers, fetchTasks, updateTask } from "../store";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Drawer from "@mui/material/Drawer";

const TaskCard = (props) => {
	const { task } = props;
	const dispatch = useDispatch();
	const [open, setOpen] = useState(false);
	const [disabled, setDisabled] = useState(true);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [drawerTask, setDrawerTask] = useState({});

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const toggleDrawer = () => {
		setDrawerOpen(false);
	};

	const onEdit = (ev) => {
		setDrawerTask({
			...drawerTask,
			[ev.target.name]: ev.target.value,
		});
	};

	const editTask = () => {
		dispatch(updateTask(drawerTask));
		toggleDrawer();
		setDrawerTask({});
		dispatch(fetchTasks());
	};

	return (
		<Grid
			container
			align="center"
			sx={{
				display: "flex",
				flexDirection: "column",
				boxShadow: 5,
				borderRadius: 2,
				justifyContent: "center",
				margin: "1rem",
				padding: "1rem",
				width: "300px",
			}}
		>
			<Grid item>
				<Typography variant="h6">
					{task.name} {"  "}
					<IconButton>
						<EditIcon
							onClick={() => {
								setDrawerTask(task);
								setDrawerOpen(true);
							}}
						/>
					</IconButton>
				</Typography>
			</Grid>
			<br />
			<Grid item align="left">
				<Typography>Description: {task.description}</Typography>
			</Grid>
			<Drawer
				anchor={"right"}
				open={drawerOpen}
				onClose={toggleDrawer}
				PaperProps={{
					sx: { width: "40%" },
				}}
			>
				<FormControl sx={{ padding: 2, margin: "normal" }}>
					<Typography variant="h3">Task Details</Typography>
					<TextField
						autoFocus
						id="name"
						label="name"
						name="name"
						type="text"
						variant="standard"
						margin="normal"
						fullWidth
						value={drawerTask.name}
						onChange={onEdit}
					/>
					<TextField
						autoFocus
						id="desc"
						label="description"
						name="description"
						type="text"
						variant="standard"
						margin="normal"
						value={drawerTask.description}
						onChange={onEdit}
						fullWidth
						multiline
					/>
					<Select
						name="status"
						value={drawerTask.status}
						onChange={onEdit}
						label="status"
						margin="normal"
					>
						<MenuItem value={"To Do"}>To Do</MenuItem>
						<MenuItem value={"In Progress"}>In Progress</MenuItem>
						<MenuItem value={"Done"}>Done</MenuItem>
						<MenuItem value={"Backlog"}>Backlog</MenuItem>
					</Select>
					<FormHelperText>Status</FormHelperText>
					<Button variant="contained" onClick={editTask}>
						Update Task
					</Button>
				</FormControl>
			</Drawer>
		</Grid>
	);
};

export default TaskCard;
