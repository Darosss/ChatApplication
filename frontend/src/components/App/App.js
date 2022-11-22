import "./style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import Loading from "../Loading";
import Home from "../Home";
import Chats from "../Chats";
import Login from "../Login/";
import Register from "../Register";
import Profil from "../Profil";
import Rooms from "../Rooms";
import Users from "../Users";
import Ranges from "../Ranges";

function App() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}/session`, {
        withCredentials: true,
      })
      .then((res) => {
        setAuth(res.data);
      });
  }, []);
  if (auth === null) {
    return <Loading />;
  }
  return (
    <div className="app-header">
      <NavigationBar auth={auth} />

      <div className="app-content">
        <Routes>
          <Route
            path="/login"
            element={auth ? <Home auth={auth} /> : <Login />}
          />
          <Route path="/" element={<Home auth={auth} />} />
          <Route
            path="/chats"
            element={
              !auth.isBanned ? <Chats auth={auth} /> : <Profil auth={auth} />
            }
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Home auth={auth} />}
          />
          <Route
            path="/profil"
            element={auth ? <Profil auth={auth} /> : <Login />}
          />
          <Route
            path="/rooms"
            element={
              auth && !auth.isBanned ? (
                <Rooms />
              ) : auth.isBanned ? (
                <Profil auth={auth} />
              ) : (
                <Login />
              )
            }
          />

          <Route
            path="/users"
            element={
              auth && auth.administrator && !auth.isBanned ? (
                <Users />
              ) : (
                <Home auth={auth} />
              )
            }
          />
          <Route
            path="/ranges"
            element={
              auth && auth.administrator && !auth.isBanned ? (
                <Ranges />
              ) : (
                <Home auth={auth} />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
