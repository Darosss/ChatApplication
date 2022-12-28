import { cleanEnv, str, port } from "envalid";

const validateEnv = (): void => {
  cleanEnv(process.env, {
    BACKEND_PORT: port({ default: 5000 }),
    FRONTEND_URL: str(),
    DATABASE_URL: str(),
    COOKIE_SECRET: str(),
    JWT_SECRET_KEY: str(),
    NODE_ENV: str({
      choices: ["development", "test", "production", "staging"],
    }),
  });
};
export default validateEnv;
