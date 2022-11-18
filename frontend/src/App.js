import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import Loading from "./components/Loading";
import Home from "./components/Home";
import Chats from "./components/chats/Chats";
import Login from "./components/Login";
import Register from "./components/Register";
import Profil from "./components/profil/Profil";
import Rooms from "./components/rooms/Rooms";
import Users from "./components/users/Users";
import Ranges from "./components/ranges/Ranges";

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
    <div>
      <NavigationBar auth={auth} />

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
  );
}

export default App;
