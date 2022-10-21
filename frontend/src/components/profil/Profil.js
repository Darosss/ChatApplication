import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilDetails from "./ProfilDetails";
import EditProfile from "./EditProfile";
function Profile({ auth }) {
  console.log(auth, " auth");
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/profil/" + auth._id,
    };

    axios(axiosConfig).then((res) => {
      console.log(res.data.userDetails, "profil");

      setUserDetails(res.data.userDetails);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>
          You are logged in as {auth && auth.username ? auth.username : null}
        </p>
        <ProfilDetails user={userDetails} />
        <EditProfile user={userDetails} />
      </header>
    </div>
  );
}

export default Profile;
