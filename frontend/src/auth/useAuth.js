import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = (userDetails) => {
    setUser(userDetails);
    axios({
      method: "POST",
      data: {
        username: userDetails.username,
        password: userDetails.password,
      },
      withCredentials: true,
      url: "/login",
    }).then((res) => {
      console.log(res);
    });
    navigate("/profil");
  };

  const logout = () => {
    setUser({});
    axios({
      method: "POST",
      withCredentials: true,
      url: "/logout",
    }).then((res) => {
      console.log(res);
    });
    navigate("/");
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(authContext);
};
