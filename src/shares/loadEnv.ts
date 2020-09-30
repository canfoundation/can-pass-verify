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
}

if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
loadEnv();
