import React from "react";
import axios from "axios";
function Profile({ auth }) {
  const logout = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      withCredentials: true,
      url: "http://localhost:5000/logout",
    })
      .then((res) => {
        console.log(res, "res");
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err, "err");
      });
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
