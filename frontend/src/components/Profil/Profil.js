import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilDetails from "./ProfilDetails";

function Profile({ auth }) {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    const axiosConfig = {
      method: "get",
      withCredentials: true,
      url: `${process.env.REACT_APP_API_URI}/profil/` + auth.id,
    };
    axios(axiosConfig).then((res) => {
      setUserDetails(res.data.userDetails);
    });
  }, [auth]);

  return (
    <div>
      <div className="section-header">
        <h1> Profil </h1>
      </div>
      <ProfilDetails user={userDetails} />
    </div>
  );
}

export default Profile;