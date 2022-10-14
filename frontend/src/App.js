import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { ReactSession } from "react-client-session";

import ChatsComponent from "./components/ChatsComponent";
import LoginComponent from "./components/LoginComponent";
import RegisterComponent from "./components/RegisterComponent";
import Profil from "./components/Profil";

ReactSession.setStoreType("localStorage");
class App extends Component {
  render() {
    return (
      <div className="container">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <span className="navbar-brand">Chat room</span>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/chatRoom"} className="nav-link">
                  Room
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route exact path="/" element={<ChatsComponent />} />
          <Route exact path="/login" element={<LoginComponent />} />
          <Route exact path="/register" element={<RegisterComponent />} />
          <Route exact path="/profil" element={<Profil />} />
        </Routes>
      </div>
    );
  }
}
export default App;
