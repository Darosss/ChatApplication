import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "@contexts/authContext";
import { IAuth } from "src/@types/types";
import { SendDataContext } from "@contexts/SendDataContext";
import { AxiosRequestHeaders } from "axios";

export const axiosResponseDefaultData = {
  statusText: "",
  headers: {},
  config: {
    headers: {} as AxiosRequestHeaders,
  },
};

export const RenderMockedSendDataContext = (props: {
  children: React.ReactNode;
  sendData: <T = unknown>(dataToSend?: T | undefined) => Promise<void>;
}) => {
  const { children, sendData } = props;
  return <SendDataContext.Provider value={{ sendData }}>{children}</SendDataContext.Provider>;
};

export const RenderRouterAndSendDataContextComponent = (props: { children: React.ReactNode; sendData?: jest.Mock }) => {
  const { children, sendData = jest.fn() } = props;
  return (
    <RouterWrapper>
      <RenderMockedSendDataContext sendData={sendData}>{children}</RenderMockedSendDataContext>
    </RouterWrapper>
  );
};

export function RenderMockedAuthContext(props: { children: React.ReactNode; auth: IAuth; removeAuth: () => void }) {
  const { children, auth, removeAuth } = props;
  return <AuthContext.Provider value={{ auth, removeAuth }}>{children}</AuthContext.Provider>;
}

export function RouterWrapper(props: { children: React.ReactNode }) {
  const { children } = props;
  return <Router>{children}</Router>;
}

export const RenderRouterAndAuthContextComponent = (props: {
  children: React.ReactNode;
  auth?: IAuth | null;
  removeAuth?: () => void;
}) => {
  const { children, auth = null, removeAuth: removeAuth = jest.fn() } = props;
  return (
    <RouterWrapper>
      {auth ? (
        <RenderMockedAuthContext auth={auth} removeAuth={removeAuth}>
          {children}
        </RenderMockedAuthContext>
      ) : (
        children
      )}
    </RouterWrapper>
  );
};
