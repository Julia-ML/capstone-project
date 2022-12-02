import React, { useState, useEffect } from "react";
import { createUser, fetchUsers } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = (loginToggleState) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setToggle } = loginToggleState; 

  const onChange = (ev) => {
    setCredentials({ ...credentials, [ev.target.name]: ev.target.value });
  };

  const onChangeConfirm = (ev) => {
    setConfirmPassword(ev.target.value);
  };

  const login = (ev) => {
    ev.preventDefault();
    credentials.username && credentials.password && confirmPassword
      ? users.filter((user) => user.username === credentials.username).length
        ? alert("username taken")
        : credentials.password === confirmPassword
        ? dispatch(createUser(credentials), navigate("/"))
        : alert("password must match")
      : alert("all fields required");
  };
  return (
    <div>
      <button onClick={()=> setToggle(false)}> back to Login page</button>
      <h2>Register</h2>
      <form onSubmit={login}>
        <input
          placeholder="username"
          value={credentials.username}
          name="username"
          onChange={onChange}
          maxLength={15}
        />
        <input
          placeholder="first name"
          name="firstName"
          value={credentials.firstName}
          onChange={onChange}
        />
        <input
          placeholder="last name"
          name="lastName"
          value={credentials.lastName}
          onChange={onChange}
        />
        <input
          placeholder="email"
          name="email"
          value={credentials.email}
          onChange={onChange}
        />
        <input
          placeholder="password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={onChange}
        />
        <input
          placeholder="confirm password"
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={onChangeConfirm}
        />
        <button >Register</button>
      </form>
    </div>
  );
};

export default Register;
