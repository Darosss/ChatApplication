import useAcciosHook from "./useAcciosHook";

export function useGetSession() {
  const {
    response: authResponse,
    loading: authLoading,
    error: authError,
    sendData: getSession,
  } = useAcciosHook<IAuth>({
    url: `/session`,
    method: "get",
    withCredentials: true,
  });

  return {
    authResponse,
    authLoading,
    authError,
    getSession,
  };
}

export function useRegister() {
  const {
    response: registerResponse,
    error: registerError,
    sendData: register,
  } = useAcciosHook<{ message: string }>(
    {
      url: `/register`,
      method: "post",
      withCredentials: true,
    },
    {
      redirectUrl: "/login",
      manual: true,
    },
  );

  return {
    registerResponse,
    registerError,
    register,
  };
}

export function useLogout() {
  const {
    response: logoutResponse,
    error: logoutError,
    sendData: logout,
  } = useAcciosHook<{ message: string }>(
    {
      url: `/logout`,
      method: "post",
      withCredentials: true,
    },
    {
      redirectUrl: "/login",
      manual: true,
    },
  );

  return {
    logoutResponse,
    logoutError,
    logout,
  };
}

export function useLogin() {
  const {
    response: loginResponse,
    error: loginError,
    sendData: login,
  } = useAcciosHook<{ message: string }>(
    {
      url: `/login`,
      method: "post",
      withCredentials: true,
    },
    {
      redirectUrl: "/",
      manual: true,
    },
  );

  return {
    loginResponse,
    loginError,
    login,
  };
}
