import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Chats from "./components/Chat";
import Login from "./components/Login";
import Register from "./components/Register";
import Profil from "./components/Profil";
import Rooms from "./components/Rooms";
import NavigationLink from "./components/NavigationLink";

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
    return "LOADING";
  }
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand">Chat room</span>
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
      </nav>

      <Routes>
        <Route
          path="/login"
          element={auth ? <Profil auth={auth} /> : <Login />}
        />
        <Route path="/" element={<Chats />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profil"
          element={auth ? <Profil auth={auth} /> : <Chats />}
        />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </div>
  );
}

export default App;
