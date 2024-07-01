export default {
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // rootDir: 'src',
  // moduleNameMapper: {
  //   '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
  //   '^@app/(.*)$': '<rootDir>/$1',
  // },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
}
