import { cookieSecret, nodeEnv } from "./envVariables";

export const cookieSessionOpt: CookieSessionInterfaces.CookieSessionOptions = {
  name: "session",
  secret: cookieSecret,
  secure: nodeEnv === "development" ? false : true,
  sameSite: nodeEnv !== "development" ? "none" : "lax",
  expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
};
