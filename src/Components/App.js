import React, { useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import ProjectGallery from "./ProjectGallery";
import { useSelector, useDispatch } from "react-redux";
import { loginWithToken } from "../store";
import { Link, Routes, Route } from "react-router-dom";

const App = () => {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
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
      <h1>Acme Shopping</h1>
      {auth.id ? (
        <Home />
      ) : (
        <div>
          <Login />
        </div>
      )}
      {!!auth.id && (
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
          </nav>
          <Routes>
            <Route path="/projects" element={<ProjectGallery />} />
          </Routes>
        </div>
      )}
    </div>
  );
};

export default App;
