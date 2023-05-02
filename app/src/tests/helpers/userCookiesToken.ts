import jwt from "jsonwebtoken";
import Keygrip from "keygrip";
import { cookieSecret } from "@/config/envVariables";
export const getCookiesToken = (username: string) => {
  const token = {
    jwt: jwt.sign({ username: username }, process.env.JWT_SECRET_KEY, {
      expiresIn: 86400,
    }),
  };
  const str = JSON.stringify(token);
  const tokenBase64 = Buffer.from(str).toString("base64");

  const keyGrip = new Keygrip([cookieSecret]);
  const signedToken = keyGrip.sign(`session=${tokenBase64}=`);

  return [`session=${tokenBase64}=`, `session.sig=${signedToken}`];
};
