import {
  Button,
  Container,
  ListItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";

export const Profile = () => {
  const { auth } = useSelector((state) => state);
  const [editToggle, setEditToggle] = useState({
    username: false,
    email: false,
    firstName: false,
    lastName: false,
  });
  const editMode = (type) => {
    setEditToggle({ ...editToggle, [type]: !editToggle[type] });
    console.log(editToggle);
  };
  return (
    <Container>
      <Paper>
        <Typography mt={7} align="center" variant="h3">
          Account Information
        </Typography>
        <Stack
          spacing={2}
          direction="column"
          alignItems="flex-start"
          justifyContent="center">
          <ListItem>
            {!editToggle.username ? (
              <div>
                <strong>Username: {auth.username} </strong>
                <Button onClick={() => editMode("username")}>
                  <EditIcon />
                </Button>
              </div>
            ) : (
              <div>
                <form>
                  <TextField label="Username" />
                </form>
                <Button onClick={() => editMode("username")}>
                  <CancelIcon />
                </Button>
              </div>
            )}
          </ListItem>
          <ListItem>
            {!editToggle.email ? (
              <div>
                <strong>Email: {auth.email} </strong>
                <Button onClick={() => editMode("email")}>
                  <EditIcon />
                </Button>
              </div>
            ) : (
              <div>
                <form>
                  <TextField label="Email" />
                </form>
                <Button onClick={() => editMode("email")}>
                  <CancelIcon />
                </Button>
              </div>
            )}
          </ListItem>
          <ListItem>
            {!editToggle.firstName ? (
              <div>
                <strong>First Name: {auth.firstName} </strong>
                <Button onClick={() => editMode("firstName")}>
                  <EditIcon />
                </Button>
              </div>
            ) : (
              <div>
                <form>
                  <TextField label="First Name" />
                  <Button onClick={() => editMode("firstName")}>
                    <CancelIcon />
                  </Button>
                </form>
              </div>
            )}
          </ListItem>
          <ListItem>
            {!editToggle.lastName ? (
              <div>
                <strong>Last Name: {auth.lastName} </strong>
                <Button onClick={() => editMode("lastName")}>
                  <EditIcon />
                </Button>
              </div>
            ) : (
              <div>
                <form>
                  <TextField label="Last Name" />
                </form>
                <Button onClick={() => editMode("lastName")}>
                  <CancelIcon />
                </Button>
              </div>
            )}
          </ListItem>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
