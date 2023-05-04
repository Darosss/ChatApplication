import React, { useContext } from "react";
import { AuthContext } from "@contexts/authContext";

function Home() {
  const { auth } = useContext(AuthContext);

  return (
    <div className="section-header">
      {auth ? (
        <h1>Welcome back, {auth.username}. How&apos;s goin? </h1>
      ) : (
        <h1>Hello, log in or register to chat with others. :)</h1>
      )}
    </div>
  );
}

export default Home;
