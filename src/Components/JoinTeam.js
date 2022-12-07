import { Button, Paper, TextField, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store";

export const JoinTeam = () => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({ teamId: "" });

  const onChange = (ev) => {
    setInput({ ...input, [ev.target.name]: ev.target.value });
  };

  const formSubmit = async (ev) => {
    ev.preventDefault();
    dispatch(updateUser(input));
  };
  return (
    <Paper>
      <Typography mt={7} align="center" variant="h3">
        Join a team
      </Typography>
      <form onSubmit={formSubmit}>
        <TextField
          label="Enter Team Id"
          value={input.teamId}
          onChange={onChange}
          name="teamId"
          margin="normal"
          fullWidth
        />
        <Button type="submit" variant="contained">
          {" "}
          Create Team{" "}
        </Button>
      </form>
    </Paper>
  );
};
