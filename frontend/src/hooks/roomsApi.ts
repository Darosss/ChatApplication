import useAcciosHook from "./useAcciosHook";

export function useGetRooms() {
  const {
    response: roomsResponse,
    loading: roomsLoading,
    error: roomsError,
    sendData: refetchRooms,
  } = useAcciosHook<{ rooms: IChatRoomRes[] }>({
    url: `/rooms`,
    method: "get",
    withCredentials: true,
  });

  return { roomsResponse, roomsLoading, roomsError, refetchRooms };
}

export function useGetLoggedUserRooms() {
  const {
    response: roomsResponse,
    loading: roomsLoading,
    error: roomsError,
    sendData: getUsersRoom,
  } = useAcciosHook<{ rooms: IChatRoomRes[] }>({
    url: `rooms/users-rooms`,
    method: "get",
    withCredentials: true,
  });
  return { roomsResponse, roomsLoading, roomsError, getUsersRoom };
}

export function useGetRoomMessages(roomId: string) {
  const {
    response: messagesResponse,
    loading: messagesLoading,
    error: messagesError,
    sendData: getRoomMessages,
  } = useAcciosHook<{ chatRoom: { id: string; messages: IMessagesRes[] } }>(
    {
      url: `/rooms/${roomId}/messages`,
      method: "get",
      withCredentials: true,
    },
    { manual: true },
  );

  return { messagesResponse, messagesLoading, messagesError, getRoomMessages };
}

export function useCreateOrUpdateRoom(roomId?: string, roomData?: RoomUpdateData) {
  const url = "rooms" + (roomId ? `/edit/${roomId}` : "/create");
  const method = `${roomId ? "patch" : "post"}`;
  const { response, error, sendData } = useAcciosHook<{ message: string; room: IChatRoomRes }>(
    {
      url: url,
      method: method,
      withCredentials: true,
      data: roomData,
    },
    {
      manual: true,
    },
  );

  return { response, error, sendData };
}

export function useDeleteRoom(roomId: string) {
  const {
    response: roomDeleteResponse,
    error: roomDeleteError,
    sendData: deleteRoom,
  } = useAcciosHook<{ message: string }>(
    {
      url: `rooms/delete/${roomId}`,
      method: "delete",
      withCredentials: true,
    },
    {
      manual: true,
    },
  );

  return { roomDeleteResponse, roomDeleteError, deleteRoom };
}
