import { createContext } from "react";
import { IAuth } from "src/@types/types";

interface IAuthContext {
  auth: IAuth;
  // setAuth: React.Dispatch<React.SetStateAction<IAuth | null>>;
  removeAuth: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  auth: null!,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  removeAuth: () => {},
});
