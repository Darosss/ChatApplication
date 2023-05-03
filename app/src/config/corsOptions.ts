import { frontendUrl } from "./envVariables";

export const corsOptions = {
  origin: frontendUrl,
  credentials: true,
  allowedHeaders:
    "X-Requested-With, content-type, x-access-token, Origin, Content-Type, Accept, Set-Cookie, Cookie",
  methods: ["GET", "POST", "PATCH", "DELETE"],
};
