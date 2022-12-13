import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register from "./Register"
import { Button, Container, Grid, Paper, TextField, Typography } from "@mui/material";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const [toggle, setToggle] = useState(false);

  const login = (ev) => {
    ev.preventDefault();
    dispatch(attemptLogin(credentials));
    navigate("/dashboard")
  };

  return (
      <Container>
        <br></br>
        <Paper elevation={10}>
        {!toggle && (
          <div>
            <Typography variant="h3" align="center"> Login </Typography>
            <form onSubmit={login}>
              <Grid container>
                  <Grid item xs={12} md={6}>
                    <TextField label='Username' value={credentials.username} onChange={onChange} name="username" margin="normal" fullWidth/>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField type="password" label='Password' value={credentials.password} onChange={onChange} name="password" margin="normal" fullWidth/>
                  </Grid>
              </Grid>
              <Button type="submit" variant="contained">Login</Button>
            </form>
            <br></br>
            <Button fullWidth onClick={()=> setToggle(true)} variant="contained">Create Account</Button>
          </div>
        )}  
        {toggle && < Register toggle={toggle} setToggle={setToggle} />}
        </Paper>
      </Container>
  );
};

export default Login;
