import React, { createContext, useContext, useState } from "react";

import axios from "axios";
const authContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const reloadSite = () => {
    window.location.reload(false);
  };
  const login = (userDetails) => {
    axios({
      method: "POST",
      data: {
        username: userDetails.username,
        password: userDetails.password,
      },
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => {
      console.log(res);
      setUser(userDetails);
      reloadSite();
    });
  };

  const logout = () => {
    console.log("IS LOGGED OUT WHY?");
    setUser({});
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    })
      .then((res) => {
        console.log(res, "res");
        reloadSite();
      })
      .catch((err) => {
        console.log(err, "err");
      });
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
