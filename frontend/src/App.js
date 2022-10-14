import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { ReactSession } from "react-client-session";

import Chats from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profil from "./components/Profil";
import Rooms from "./components/Rooms";
import Logout from "./components/Logout";

function App() {
  ReactSession.setStoreType("localStorage");
  const loggedIn = ReactSession.get("authenticated");
  console.log("authenticated", loggedIn);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Chat room</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {loggedIn ? (
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
            ) : null}
            {!loggedIn ? (
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            ) : null}
            {!loggedIn ? (
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            ) : null}
            {loggedIn ? (
              <li className="nav-item">
                <Link to={"/rooms"} className="nav-link">
                  Your rooms
                </Link>
              </li>
            ) : null}
            {loggedIn ? (
              <li className="nav-item">
                <Link to={"/profil"} className="nav-link">
                  Profil
                </Link>
              </li>
            ) : null}
            {loggedIn ? (
              <li className="nav-item">
                <Logout />
              </li>
            ) : null}
          </ul>
        </div>
      </nav>
      <Routes>
        <Route
          exact
          path="/"
          element={!loggedIn ? <Navigate replace to="/login" /> : <Chats />}
        />
        <Route
          exact
          path="/login"
          element={loggedIn ? <Navigate replace to="/" /> : <Login />}
        />
        <Route
          exact
          path="/register"
          element={loggedIn ? <Navigate replace to="/" /> : <Register />}
        />
        <Route
          exact
          path="/rooms"
          element={!loggedIn ? <Navigate replace to="/login" /> : <Rooms />}
        />
        <Route
          exact
          path="/profil"
          element={!loggedIn ? <Navigate replace to="/login" /> : <Profil />}
        />
      </Routes>
    </div>
  );
}

export default App;
