import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilDetails from "./ProfilDetails";
function Profile({ auth }) {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: "http://localhost:5000/profil/" + auth._id,
    };
    axios(axiosConfig).then((res) => {
      setUserDetails(res.data.userDetails);
    });
  }, [auth]);

  return (
    <div className="App">
      <header className="App-header">
        <ProfilDetails user={userDetails} />
      </header>
    </div>
  );
}

export default Profile;
