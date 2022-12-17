import React from "react";
import {
  Button,
  Container,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { fetchProjects, fetchTeams, setNewAdmin } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CreateTeam from "./CreateTeam";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { JoinTeam } from "./JoinTeam";
import CancelIcon from "@mui/icons-material/Cancel";
import { RemoveTeamMember } from "../store";
import axios from "axios";
import { useState } from "react";
import EmailSummary from "./EmailSummary";

const Team = () => {
  const dispatch = useDispatch();
  const { teams, auth } = useSelector((state) => state);
  let adminView = false;

  useEffect(() => {
    dispatch(fetchTeams());
    dispatch(fetchProjects());
  }, [auth]);

  if (auth.id === teams.adminId) {
    adminView = true;
  }

  const [recipientInfo, setRecipientInfo] = useState({
    email: "",
  });

  const onChange = (ev) => {
    setRecipientInfo({ ...recipientInfo, [ev.target.name]: ev.target.value });
  };

  const inviteToTeam = async (ev) => {
    ev.preventDefault();
    await axios.post("/api/emails/invite/team", {
      teamId: teams.id,
      recipient: recipientInfo.email,
      senderName: auth.firstName,
    });
    setRecipientInfo("");
  };

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
                  return (
                    <ListItem key={user.id}>
                      {user.firstName}
                      {adminView && user.id !== teams.adminId && (
                        <div>
                          <Button
                            onClick={() => dispatch(RemoveTeamMember(user))}>
                            {" "}
                            <CancelIcon />
                          </Button>
                          <Button onClick={() => dispatch(setNewAdmin(user))}>
                            Set as new admin
                          </Button>
                        </div>
                      )}
                    </ListItem>
                  );
                })}
            </Stack>
          </Typography>
          <form onSubmit={(ev) => inviteToTeam(ev)}>
            <Typography variant="h3" align="center">
              Invite new user to team
            </Typography>
            <TextField
              label="Recipient's email address"
              name="email"
              onChange={onChange}
              required
            />
            <Button variant="contained" fullWidth type="submit">
              Invite User
            </Button>
          </form>
        </Paper>
      ) : (
        <div>
          <CreateTeam />
          <JoinTeam />
        </div>
      )}
      {adminView && (
        <div>
          <br />
          <EmailSummary />
        </div>
      )}
    </Container>
  );
};

export default Team;
