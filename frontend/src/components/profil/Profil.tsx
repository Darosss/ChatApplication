import "./style.css";
import React, { useEffect, useState } from "react";
import ProfilDetails from "./profilDetails";
import useAcciosHook from "@hooks/useAcciosHook";

function Profile() {
  const [userDetails, setUserDetails] = useState<IUserRes>();

  const { response, error, loading } = useAcciosHook({ url: `/profil`, method: "get", withCredentials: true });

  useEffect(() => {
    setUserDetails(response?.data.userDetails);
  }, [response]);

  return (
    <div>
      <div className="section-header">
        <h1> Profil </h1>
      </div>
      {userDetails && !loading && !error ? <ProfilDetails user={userDetails} /> : "Fetching data..."}
    </div>
  );
}

export default Profile;
