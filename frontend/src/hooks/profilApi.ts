import useAcciosHook from "./useAcciosHook";

export function useGetProfilDetails() {
  const {
    response: profilDetailsResponse,
    loading: profilDetailsLoading,
    error: profilDetailsError,
    sendData: refetchProfilDetails,
  } = useAcciosHook<{ user: IUserRes }>({
    url: `/profil`,
    method: "get",
    withCredentials: true,
  });

  return {
    profilDetailsResponse,
    profilDetailsLoading,
    profilDetailsError,
    refetchProfilDetails,
  };
}

export function useProfilEdit(updateData: LoggedUserUpdateData) {
  const {
    response: profilEditResponse,
    error: profilEditError,
    sendData: profilEdit,
  } = useAcciosHook<{ message: string }>({
    url: `/profil/edit`,
    method: "patch",
    withCredentials: true,
    data: updateData,
  });

  return { profilEditResponse, profilEditError, profilEdit };
}
