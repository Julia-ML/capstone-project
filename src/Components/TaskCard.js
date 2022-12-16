import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const TaskCard = (props) => {
	const { task } = props;
	return (
		<Grid
			item
			align="center"
			sx={{
				display: "flex",
				flexDirection: "column",
				boxShadow: 1,
				borderRadius: 2,
				justifyContent: "left",
				alignItems: "left",
				margin: "1rem",
				padding: "1rem",
				maxWidth: "300px",
			}}
		>
			<Typography variant="h6">{task.name}</Typography>
			<br />
			<Typography>Description: {task.description}</Typography>
		</Grid>
	);
};

export default TaskCard;
