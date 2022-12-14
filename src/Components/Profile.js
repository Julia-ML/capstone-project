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
import { updateUser, deleteUser, logout, fetchTeams } from "../store";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./DeleteDialog";
import AdminError from "./ErrorDialog";

export const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, users, teams } = useSelector((state) => state);
  const [editToggle, setEditToggle] = useState({
    username: false,
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    checker: false,
  });

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    setUserInfo({
      username: auth.username,
      password: auth.password,
      firstName: auth.firstName,
      lastName: auth.lastName,
      email: auth.email,
    });
  }, [auth]);

  useEffect(() => {
    dispatch(fetchTeams());
  }, [auth]);

  const editMode = (type, cancel) => {
    setEditToggle({
      ...editToggle,
      [type]: !editToggle[type],
      checker: !editToggle.checker,
    });
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
                {!editToggle.checker && (
                  <Button onClick={() => editMode("username")}>
                    <EditIcon />
                  </Button>
                )}
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
                {!editToggle.checker && (
                  <Button onClick={() => editMode("email")}>
                    <EditIcon />
                  </Button>
                )}
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
                {!editToggle.checker && (
                  <Button onClick={() => editMode("firstName")}>
                    <EditIcon />
                  </Button>
                )}
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
                {!editToggle.checker && (
                  <Button onClick={() => editMode("lastName")}>
                    <EditIcon />
                  </Button>
                )}
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
          <ListItem>
            {!editToggle.password ? (
              <div>
                <strong>Password: </strong>
                {!editToggle.checker && (
                  <Button onClick={() => editMode("password")}>
                    <EditIcon />
                  </Button>
                )}
              </div>
            ) : (
              <div>
                <form
                  onSubmit={(ev) =>
                    updateInfo(ev, "password", { password: userInfo.password })
                  }>
                  <TextField
                    label="Password"
                    type="password"
                    value={userInfo.password}
                    name="password"
                    onChange={onChange}
                  />
                  <Button type="submit">Update</Button>
                </form>
                <Button onClick={() => editMode("password", true)}>
                  <CancelIcon />
                </Button>
              </div>
            )}
          </ListItem>
        </Stack>
        {auth.id === teams.adminId ? (
          <div>
            <AdminError />
          </div>
        ) : (
          <div>
            <ConfirmDelete />
          </div>
        )}
        <br></br>
      </Paper>
    </Container>
  );
};

export default Profile;
