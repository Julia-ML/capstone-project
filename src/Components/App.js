import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import LandingPage from "./LandingPage";
import ProjectGallery from "./ProjectGallery";
import ProjectDetail from "./ProjectDetail";
import NavBar from "./Nav";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";
import Profile from "./Profile";
import Team from "./Team";

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
          <div className="nav">
            <NavBar />
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:teamIdEmail" element={<Login />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:teamIdEmail" element={<Team />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/projects" element={<ProjectGallery />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
