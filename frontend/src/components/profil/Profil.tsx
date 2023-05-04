import React, { useEffect, useState } from "react";
import ProfilDetails from "./profilDetails";
import useAcciosHook from "@hooks/useAcciosHook";
import { SendDataContext } from "@contexts/SendDataContext";

function Profile() {
  const [userDetails, setUserDetails] = useState<IUserRes>();

  const {
    response,
    error,
    loading,
    sendData: refetchProfil,
  } = useAcciosHook<{ user: IUserRes }>({
    url: `/profil`,
    method: "get",
    withCredentials: true,
  });

  useEffect(() => {
    setUserDetails(response?.data.user);
  }, [response]);

  return (
    <SendDataContext.Provider value={{ sendData: refetchProfil }}>
      <div>
        <div className="section-header">
          <h1> Profil </h1>
        </div>
        {userDetails && !loading && !error ? <ProfilDetails user={userDetails} /> : "Fetching data..."}
      </div>
    </SendDataContext.Provider>
  );
}

export default Profile;
