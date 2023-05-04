import { createContext } from "react";

interface IAuthContext {
  auth: IAuth;
  setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
}

export const AuthContext = createContext<IAuthContext>({
  auth: null!,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAuth: () => {},
});
