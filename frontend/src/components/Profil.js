import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilDetails from "./profilDetails";
function Profile({ auth }) {
  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/profil",
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
      </header>
    </div>
  );
}

export default Profile;
