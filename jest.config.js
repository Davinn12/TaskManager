const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Apunta a la raíz del proyecto Next.js
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
};

module.exports = createJestConfig(config);
