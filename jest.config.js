export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  roots: ['<rootDir>/src/tests/unit'],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  },
  testMatch: [
    "**/__tests__/**/*.(ts|tsx|js)",
    "**/?(*.)+(spec|test).(ts|tsx|js)"
  ],
};