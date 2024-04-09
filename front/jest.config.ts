import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const esModules = ["jose"].join("|");

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^.+\\.(svg)$": "<rootDir>/src/tests/component-type/__mocks__/SvgrMock.jsx",
    "^jose": require.resolve("jose"),
    "^@panva/hkdf": require.resolve("@panva/hkdf"),
    "^uuid": require.resolve("uuid"),
    "^preact-render-to-string": require.resolve("preact-render-to-string"),
    "^preact": require.resolve("preact"),
  },
  transformIgnorePatterns: [`/node_modules/(?!${esModules})`],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
  },
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
