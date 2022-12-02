import React, { useState } from "react";
import { attemptLogin } from "../store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Register from "./Register"

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
  };
  return (
    <div>
      {!toggle && (
        <div>
          <h2>Login</h2>
          <form onSubmit={login}>
            <input
              placeholder="username"
              value={credentials.username}
              name="username"
              onChange={onChange}
            />
            <input
              placeholder="password"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <button>Login</button>
          </form>
          <button onClick={()=> setToggle(true)}>Create Account</button>
        </div>
      )}  
      {toggle && < Register toggle={toggle} setToggle={setToggle} />}
    </div>
  );
};

export default Login;
