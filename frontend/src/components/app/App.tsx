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
import NavigationBar from "./navigationBar";
import { useGetSession } from "@hooks/authApi";
import { AuthContext } from "@contexts/authContext";
import { SendDataContext } from "@contexts/SendDataContext";
import { IAuth } from "src/@types/types";

function App() {
  const [auth, setAuth] = useState<IAuth | null>(null);
  const { authResponse, authLoading, getSession } = useGetSession();
  useEffect(() => {
    if (authResponse) setAuth(authResponse?.data);
  }, [authResponse]);

  if (authLoading) {
    return (
      <div className="app-wrapper">
        <div className="app-content">
          <Loading />
        </div>
      </div>
    );
  }

  const setAuthToNull = () => setAuth(null);

  if (auth === undefined || auth === null) {
    return (
      <div className="app-wrapper">
        <div className="app-content">
          <SendDataContext.Provider value={{ sendData: getSession }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </SendDataContext.Provider>
        </div>
      </div>
    );
  }
  return (
    <AuthContext.Provider value={{ auth, removeAuth: setAuthToNull }}>
      <div className="app-wrapper">
        <NavigationBar />

        <div className="app-content">
          <Routes>
            <Route path="/login" element={auth ? <Home /> : <Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/chats" element={!auth.isBanned ? <Chats /> : <Profil />} />
            <Route path="/register" element={!auth ? <Register /> : <Home />} />
            <Route path="/profil" element={auth ? <Profil /> : <Login />} />
            <Route
              path="/rooms"
              element={auth && !auth.isBanned ? <Rooms /> : auth.isBanned ? <Profil /> : <Login />}
            />

            <Route path="/users" element={auth && auth.administrator && !auth.isBanned ? <Users /> : <Profil />} />
            <Route path="/ranges" element={auth && auth.administrator && !auth.isBanned ? <Ranges /> : <Profil />} />
          </Routes>
        </div>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
