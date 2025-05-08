/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  // setupFilesAfterEnv: [
  //   "<rootDir>/jest.setup.js"
  // ],
  testMatch: [
    "**/tests/**/*.test.ts"
  ],
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};