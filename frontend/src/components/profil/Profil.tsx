import React, { useEffect, useState } from "react";
import ProfilDetails from "./profilDetails";
import { SendDataContext } from "@contexts/SendDataContext";
import { useGetProfilDetails } from "@hooks/profilApi";
import { IUserRes } from "src/@types/types";
import { profilElementId } from "@src/utils/dataTestIdsList";

function Profile() {
  const [userDetails, setUserDetails] = useState<IUserRes>();

  const { profilDetailsResponse, profilDetailsLoading, profilDetailsError, refetchProfilDetails } =
    useGetProfilDetails();

  useEffect(() => {
    setUserDetails(profilDetailsResponse?.data.user);
  }, [profilDetailsResponse]);

  return (
    <SendDataContext.Provider value={{ sendData: refetchProfilDetails }}>
      <div data-testid={profilElementId}>
        <div className="section-header">
          <h1> Profil </h1>
        </div>
        {userDetails && !profilDetailsLoading && !profilDetailsError ? (
          <ProfilDetails user={userDetails} />
        ) : (
          "Fetching data..."
        )}
      </div>
    </SendDataContext.Provider>
  );
}

export default Profile;
