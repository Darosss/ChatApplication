import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Loading from "./components/Loading";
import Chats from "./components/Chats";
import Login from "./components/Login";
import Register from "./components/Register";
import Profil from "./components/profil/Profil";
import Rooms from "./components/rooms/Rooms";
import NavigationLink from "./components/NavigationLink";
import Logout from "./components/Logout";
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
    <div className="App">
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark hidden-xs">
        <span className="navbar-brand  m-2 ">Chat room</span>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <NavigationLink url="/" name="Home" />
            {auth ? <NavigationLink url="/chats" name="Chats" /> : null}
            {!auth ? <NavigationLink url="/login" name="Login" /> : null}
            {!auth ? <NavigationLink url="/register" name="Register" /> : null}
            {auth ? <NavigationLink url="/rooms" name="Rooms" /> : null}
            {auth ? <NavigationLink url="/profil" name="Profil" /> : null}
            {auth ? <Logout /> : null}
          </ul>
        </div>
      </nav>

      <Routes>
        <Route
          path="/login"
          element={auth ? <Profil auth={auth} /> : <Login />}
        />
        <Route path="/" element={<Home auth={auth} />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profil"
          element={auth ? <Profil auth={auth} /> : <Chats />}
        />
        <Route path="/rooms" element={auth ? <Rooms /> : <Login />} />
      </Routes>
    </div>
  );
}

export default App;
