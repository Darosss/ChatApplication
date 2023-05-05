import useAcciosHook from "./useAcciosHook";

export function useGetUsers() {
  const {
    response: usersResponse,
    loading: usersLoading,
    error: usersError,
    sendData: refetchUsers,
  } = useAcciosHook<{ users: IUserRes[] }>({
    url: `/users`,
    method: "get",
    withCredentials: true,
  });

  return { usersResponse, usersLoading, usersError, refetchUsers };
}

export function useEditUser(userId: string, updateData: UserUpdateData) {
  const {
    response: userEditResponse,
    error: userEditError,
    sendData: userEdit,
  } = useAcciosHook<{ message: string; user: IUserRes }>(
    {
      url: `users/admin/edit/${userId}`,
      method: "patch",
      withCredentials: true,
      data: updateData,
    },
    {
      manual: true,
    },
  );

  return { userEditResponse, userEditError, userEdit };
}

export function useGetUsersRooms(userId: string) {
  const {
    response: usersRoomResponse,
    loading: usersRoomLoading,
    error: usersRoomsError,
    sendData: refetchUsersRooms,
  } = useAcciosHook<{ chatRooms: IChatRoomRes[] }>(
    {
      url: `users/rooms/${userId}`,
      method: "get",
      withCredentials: true,
    },
    { manual: true },
  );

  return { usersRoomResponse, usersRoomLoading, usersRoomsError, refetchUsersRooms };
}

export function useUnbanUser(userId: string) {
  const {
    response: unbanResponse,
    error: unbanError,
    sendData: unbanUser,
  } = useAcciosHook<{ message: string; user: IUserRes }>(
    {
      url: `/users/admin/unban/${userId}`,
      method: "patch",
      withCredentials: true,
    },
    { manual: true },
  );

  return { unbanResponse, unbanError, unbanUser };
}

export function useBanUser(userId: string, banData: UserBanData) {
  const {
    response: banResponse,
    error: banError,
    sendData: banUser,
  } = useAcciosHook<{ message: string; user: IUserRes }>(
    {
      url: `/users/admin/ban/${userId}`,
      method: "patch",
      withCredentials: true,
      data: banData,
    },
    { manual: true },
  );
  return { banResponse, banError, banUser };
}
