import React from "react";
import {
  Button,
  Container,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fetchTeams } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateTeam from "./CreateTeam";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { JoinTeam } from "./JoinTeam";

const Team = () => {
  const dispatch = useDispatch();
  const { teams, auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [auth]);

  console.log(teams.id);

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
          <CopyToClipboard text={teams.id}>
            <Button variant="contained" fullWidth>
              Copy your team ID - send to teammate
            </Button>
          </CopyToClipboard>
        </Paper>
      ) : (
        <div>
          <CreateTeam />
          <JoinTeam />
        </div>
      )}
    </Container>
  );
};

export default Team;
