import React from "react";
import { useAuth } from "./useAuth";

export const RequireAuthLink = ({ children }) => {
  const auth = useAuth();
  console.log("auth link", auth.username);
  return auth.username ? children : null;
};
