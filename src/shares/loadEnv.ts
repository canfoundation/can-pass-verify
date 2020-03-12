import { logger } from './logger';

function loadEnv() {
  const config = {
    encoding: 'utf8',
    silent: true,
    path: '.env',
    defaults: '.env.defaults',
    schema: '.env.schema',
    errorOnMissing: true,
    errorOnExtra: true,
    errorOnRegex: false,
    includeProcessEnv: true,
    assignToProcessEnv: true,
    overrideProcessEnv: true,
  };

  require('dotenv-extended').load(config);
  Object.keys(process.env)
    .filter(k => /^(app_|AWS_).+/.test(k))
    .forEach(k => {
      logger.debug(k, '=', process.env[k]);
    });
}

let loaded;

if (!loaded) {
  if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
  loadEnv();
  loaded = true;
}
