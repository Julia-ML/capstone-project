import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import LandingPage from "./LandingPage"
import ProjectGallery from "./ProjectGallery";
import ProjectDetail from "./ProjectDetail";
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
              <Route path="/projects" element={<ProjectGallery />} />
              <Route path='/projects/:id' element={<ProjectDetail />} />
            </Routes>
        </div>
    </div>
  );
};

export default App;