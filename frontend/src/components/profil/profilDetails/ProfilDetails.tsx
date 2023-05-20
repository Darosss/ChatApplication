import React from "react";

import EditProfile from "../editProfile";
import { IUserRes } from "src/@types/types";
function ProfilDetails(props: { user: IUserRes }) {
  const { user } = props;

  return (
    <div className="data-wrapper">
      <div>
        <div>Your profile: {user.username}</div>
        <div>
          <EditProfile user={user} />
        </div>
      </div>
      <div>
        <div>Username</div>
        <div>{user.username}</div>
      </div>
      <div>
        <div>Firstname</div>
        <div>{user.firstname}</div>
      </div>
      <div>
        <div>Surname</div>
        <div>{user.surname}</div>
      </div>
      <div>
        <div>Email</div>
        <div>{user.email}</div>
      </div>
      <div>
        <div>Birthday</div>
        <div>{user.birthday ? user.birthday.toISOString().split("T")[0] : null}</div>
      </div>
      <div>
        <div>Created at</div>
        <div>{user.createdAt ? user.createdAt.toString().replace("T", " ").replace("Z", "") : null}</div>
      </div>
      <div>
        <div>Country</div>
        <div>{user.country}</div>
      </div>
      <div>
        <div>Gender</div>
        <div>{user.gender}</div>
      </div>
      <div>
        <div>Phone</div>
        <div>{user.phone}</div>
      </div>
      <div>
        <div>Nick color</div>
        <div>{user.nickColor}</div>
      </div>
      {user.isBanned ? (
        <div>
          <div>Banned date</div>
          <div>{user.bannedDate?.toString()}</div>
        </div>
      ) : null}
      {user.isBanned ? (
        <div>
          <div>Banned expires</div>
          <div>{user.banExpiresDate?.toString()}</div>
        </div>
      ) : null}
    </div>
  );
}

export default ProfilDetails;
