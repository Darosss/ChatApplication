import { createContext } from "react";

export const SendDataContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
  sendData: async <T = unknown>(dataToSend?: T) => {},
});
