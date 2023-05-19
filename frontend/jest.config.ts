import { pathsToModuleNameMapper, JestConfigWithTsJest } from "ts-jest";
import { compilerOptions } from "./tsconfig.json";
const config: JestConfigWithTsJest = {
  verbose: true,
  testMatch: ["<rootDir>/**/test.tsx"],
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
    "^.+\\.css$": "jest-transform-css",
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setupTests.tsx"],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
};

export default config;
