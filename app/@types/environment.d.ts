declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_PORT?: number;
      FRONTEND_URL: string;
      DATABASE_URL: string;
      COOKIE_SECRET: string;
      JWT_SECRET_KEY: string;
    }
  }
}

export {};
