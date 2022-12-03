import { Container, ListItem, Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { auth } = useSelector((state) => state);
  console.log(auth);
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
            <strong>Username: {auth.username}</strong>{" "}
          </ListItem>
          <ListItem>
            <strong>Email: {auth.email}</strong>{" "}
          </ListItem>
          <ListItem>
            <strong>First Name: {auth.firstName}</strong>{" "}
          </ListItem>
          <ListItem>
            <strong>Last Name: {auth.lastName}</strong>{" "}
          </ListItem>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Profile;
