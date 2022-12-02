import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import LandingPage from "./LandingPage";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route, useNavigate } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(loginWithToken());
  }, []);

  // useEffect(()=> {
  //   if(auth.id){
  //     dispatch(fetchCart());
  //   }
  // }, [auth]);
  return (
    <div>
      <h1 onClick={() => navigate("/")}>Daily Standup Replacer</h1>
        <div>
          <nav>
            {auth.id && (
                <div class="nav">
                  <Link to="/dashboard">Dashboard</Link>
                  <Link to="/tasks">Tasks</Link>
                  <Link to="/projects">Projects</Link>
                  <Link to="/teammates">My Teammates</Link>
                  <Link to="/profile">Profile</Link>
                </div>
              )}
          </nav>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
            </Routes>
        </div>

    </div>
  );
};

export default App;


//24   {!!auth.id && (
//33        )}