import React from "react";
import { useAuth } from "../auth/useAuth";
function Profile({ auth }) {
  const authLogout = useAuth().logout;
  const logout = (e) => {
    e.preventDefault();
    console.log("looggin out...");
    authLogout();
  };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You are logged in as {auth && auth.username ? auth.username : null}
        </p>
        <form method="POST" onSubmit={logout}>
          <input type="submit" className="App-link" value="Logout" />
        </form>
      </header>
    </div>
  );
}

export default Profile;
