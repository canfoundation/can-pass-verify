const dote = require('dotenv-extended');
jest.mock('dotenv-extended');

describe('loadEnv', () => {
  it('should load env', () => {
    require('../loadEnv');
    expect(dote.load).toBeCalledTimes(1);
    expect(dote.load).toBeCalledWith({
      assignToProcessEnv: true,
      defaults: '.env.defaults',
      encoding: 'utf8',
      errorOnExtra: true,
      errorOnMissing: true,
      errorOnRegex: false,
      includeProcessEnv: true,
      overrideProcessEnv: true,
      path: '.env',
      schema: '.env.schema',
      silent: true,
    });
  });
  it('should load env', () => {
    process.env.NODE_ENV = '';
    jest.resetModules();
    require('../loadEnv');
    expect(process.env.NODE_ENV).toEqual('development');
    expect(dote.load).toBeCalledTimes(1);
    expect(dote.load).toBeCalledWith({
      assignToProcessEnv: true,
      defaults: '.env.defaults',
      encoding: 'utf8',
      errorOnExtra: true,
      errorOnMissing: true,
      errorOnRegex: false,
      includeProcessEnv: true,
      overrideProcessEnv: true,
      path: '.env',
      schema: '.env.schema',
      silent: true,
    });
  });
});
