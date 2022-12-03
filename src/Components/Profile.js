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
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store";

export const Profile = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [editToggle, setEditToggle] = useState({
    username: false,
    email: false,
    firstName: false,
    lastName: false,
  });

  const [userInfo, setUserInfo] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setUserInfo({
      username: auth.username,
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
    });
  }, [auth]);

  const editMode = (type, cancel) => {
    setEditToggle({ ...editToggle, [type]: !editToggle[type] });
    if (cancel) {
      setUserInfo({ ...userInfo, [type]: auth[type] });
    }
  };

  const onChange = (ev) => {
    setUserInfo({ ...userInfo, [ev.target.name]: ev.target.value });
  };

  const updateInfo = (ev, type, updated) => {
    ev.preventDefault();
    dispatch(updateUser(updated));
    editMode(type, true);
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
                <form
                  onSubmit={(ev) =>
                    updateInfo(ev, "username", { username: userInfo.username })
                  }>
                  <TextField
                    label="Username"
                    value={userInfo.username}
                    name="username"
                    onChange={onChange}
                  />
                  <Button type="submit">Update</Button>
                </form>
                <Button onClick={() => editMode("username", true)}>
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
                <form
                  onSubmit={(ev) =>
                    updateInfo(ev, "email", { email: userInfo.email })
                  }>
                  <TextField
                    label="Email"
                    value={userInfo.email}
                    name="email"
                    onChange={onChange}
                  />
                  <Button type="submit">Update</Button>
                </form>
                <Button onClick={() => editMode("email", true)}>
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
                <form
                  onSubmit={(ev) =>
                    updateInfo(ev, "firstName", {
                      firstName: userInfo.firstName,
                    })
                  }>
                  <TextField
                    label="First Name"
                    value={userInfo.firstName}
                    name="firstName"
                    onChange={onChange}
                  />
                  <Button type="submit">Update</Button>
                </form>
                <Button onClick={() => editMode("firstName", true)}>
                  <CancelIcon />
                </Button>
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
                <form
                  onSubmit={(ev) =>
                    updateInfo(ev, "lastName", { lastName: userInfo.lastName })
                  }>
                  <TextField
                    label="Last Name"
                    value={userInfo.lastName}
                    name="lastName"
                    onChange={onChange}
                  />
                  <Button type="submit">Update</Button>
                </form>
                <Button onClick={() => editMode("lastName", true)}>
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
