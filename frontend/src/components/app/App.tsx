import "./style.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "../loading";
import Home from "../home";
import Chats from "../chats";
import Login from "../login/";
import Register from "../register";
import Profil from "../profil";
import Rooms from "../rooms";
import Users from "../users";
import Ranges from "../ranges";
import useAcciosHook from "@hooks/useAcciosHook";
import NavigationBar from "./navigationBar";

function App() {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const { response: authResponse, loading: authLoading } = useAcciosHook({
    url: `/session`,
    method: "get",
    withCredentials: true,
  });

  useEffect(() => {
    if (authResponse !== null) setAuth(authResponse?.data);
  }, [authResponse]);

  if (authLoading) {
    return (
      <div className="app-header">
        <div className="app-content">
          <Loading />
        </div>
      </div>
    );
  }

  if (auth === undefined || auth === null) {
    return (
      <div className="app-header">
        <div className="app-content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </div>
    );
  }
  return (
    <div className="app-header">
      <NavigationBar auth={auth} />

      <div className="app-content">
        <Routes>
          <Route path="/login" element={auth ? <Home auth={auth} /> : <Login />} />
          <Route path="/" element={<Home auth={auth} />} />
          <Route path="/chats" element={!auth.isBanned ? <Chats auth={auth} /> : <Profil />} />
          <Route path="/register" element={!auth ? <Register /> : <Home auth={auth} />} />
          <Route path="/profil" element={auth ? <Profil /> : <Login />} />
          <Route path="/rooms" element={auth && !auth.isBanned ? <Rooms /> : auth.isBanned ? <Profil /> : <Login />} />

          <Route
            path="/users"
            element={auth && auth.administrator && !auth.isBanned ? <Users /> : <Home auth={auth} />}
          />
          <Route
            path="/ranges"
            element={auth && auth.administrator && !auth.isBanned ? <Ranges /> : <Home auth={auth} />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
