import React from "react";
import { Container, ListItem, Paper, Stack, Typography } from "@mui/material";
import { fetchTeams } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateTeam from "./CreateTeam";

const Team = () => {
  const dispatch = useDispatch();
  const { teams, auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [auth]);

  return (
    <Container>
      {auth.teamId !== null ? (
        <Paper>
          <Typography mt={7} align="center" variant="h3">
            My Team
            <Stack
              spacing={2}
              direction="column"
              alignItems="flex-start"
              justifyContent="center">
              {teams.users &&
                teams.users.map((user) => {
                  return <ListItem key={user.id}>{user.firstName}</ListItem>;
                })}
            </Stack>
          </Typography>
        </Paper>
      ) : (
        <CreateTeam />
      )}
    </Container>
  );
};

export default Team;
