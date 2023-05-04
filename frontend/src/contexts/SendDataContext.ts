import { createContext } from "react";

export const SendDataContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  sendData: async <T = unknown>(dataToSend?: T) => {},
});
