import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

import Chats from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profil from "./components/Profil";
import Rooms from "./components/Rooms";
import Logout from "./components/Logout";

import { RequireAuth } from "./auth/RequireAuth";
import { RequireAuthLink } from "./auth/RequireAuthLink";
import { AuthProvider, useAuth } from "./auth/useAuth";

function App() {
  ReactSession.setStoreType("localStorage");
  const auth = useAuth();
  console.log(auth, "test");
  const [loggedIn, setLoggedIn] = useState(ReactSession.get("authenticated"));

  useEffect(() => {
    console.log("EFFECT ONCE");
    ReactSession.set("authenticated", loggedIn);
  }, [loggedIn]);

  console.log("authenticated", loggedIn);

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Chat room</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <AuthProvider>
              <RequireAuthLink>
                <li className="nav-item">
                  <Link to={"/"} className="nav-link">
                    Home
                  </Link>
                </li>
              </RequireAuthLink>
            </AuthProvider>
            {!loggedIn ? (
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            ) : null}

            <li className="nav-item">
              <AuthProvider>
                <Logout />
              </AuthProvider>
            </li>
            {/*!loggedIn ? (
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
              <li className="nav-item">{<Logout test="test" />}</li>
            ) : null} */}
          </ul>
        </div>
      </nav>
      {/* <BrowserRouter> */}
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Chats />} />
          <Route
            path="/profil"
            element={
              <RequireAuth>
                <Profil />
              </RequireAuth>
            }
          />
        </Routes>
      </AuthProvider>

      {/* </BrowserRouter> */}
      {/* <Routes>
          <Route exact path="/" element={<Chats />} />

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
        </Routes> */}
    </div>
  );
}

export default App;
