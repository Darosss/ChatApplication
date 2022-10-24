import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import NavigationLink from "./components/NavigationLink";
import Loading from "./components/Loading";
import Home from "./components/Home";
import Chats from "./components/Chats";
import Login from "./components/Login";
import Register from "./components/Register";
import Profil from "./components/profil/Profil";
import Rooms from "./components/rooms/Rooms";
import Logout from "./components/Logout";
import Users from "./components/users/Users";
import Ranges from "./components/ranges/Ranges";
function App() {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    axios
      .get("/api/current-session")
      .then(({ data }) => {
        setAuth(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (auth === null) {
    return <Loading />;
  }
  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <span className="navbar-brand m-2">Chat room</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavigationLink url="/" name="Home" />
            {auth ? <NavigationLink url="/chats" name="Chats" /> : null}
            {!auth ? <NavigationLink url="/login" name="Login" /> : null}
            {!auth ? <NavigationLink url="/register" name="Register" /> : null}
            {auth ? <NavigationLink url="/rooms" name="Rooms" /> : null}
            {auth ? <NavigationLink url="/profil" name="Profil" /> : null}
          </ul>
        </div>
        <div className="m-2">
          <ul className="navbar-nav mr-auto">
            {auth && auth.administrator ? (
              <NavigationLink url="/users" name="Users" />
            ) : null}
            {auth && auth.administrator ? (
              <NavigationLink url="/ranges" name="Ranges" />
            ) : null}
            {auth ? <Logout /> : null}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route
          path="/login"
          element={auth ? <Home auth={auth} /> : <Login />}
        />
        <Route path="/" element={<Home auth={auth} />} />
        <Route path="/chats" element={<Chats />} />
        <Route
          path="/register"
          element={!auth ? <Register /> : <Home auth={auth} />}
        />
        <Route
          path="/profil"
          element={auth ? <Profil auth={auth} /> : <Login />}
        />
        <Route path="/rooms" element={auth ? <Rooms /> : <Login />} />

        <Route
          path="/users"
          element={auth && auth.administrator ? <Users /> : <Home />}
        />
        <Route
          path="/ranges"
          element={auth && auth.administrator ? <Ranges /> : <Home />}
        />
      </Routes>
    </div>
  );
}

export default App;
