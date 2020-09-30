module.exports = {
  preset: 'ts-jest',
  restoreMocks: true,
  collectCoverageFrom: ['src/**/*.{t,j}s?(x)'],
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/'],
};
