import "./style.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProfilDetails from "./ProfilDetails";

function Profile(props: { auth: IAuth }) {
  const { auth } = props;
  const [userDetails, setUserDetails] = useState<IUserRes>();

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
      {userDetails ? <ProfilDetails user={userDetails} /> : null}
    </div>
  );
}

export default Profile;
