import { RequestInfo, RequestInit, Response } from 'node-fetch';
import { URLSearchParams } from 'url';
import { logger } from './shares/logger';

interface Configs {
  canPassApi: string;
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
}

interface ClientSecret {
  client_id: string;
  client_secret: string;
}

interface VerifyOutput {
  scope: string;
  userId: string;
}

const _app: Configs = {
  canPassApi: null,
  fetch: null,
};

/**
 * config global
 * @param configs
 */
function config(configs: Configs) {
  Object.assign(_app, configs);
}

function verify(accessToken: string): Promise<VerifyOutput> {
  // handle case access-token start with `Bearer <access-token>`
  const _accessToken = accessToken.split(' ')[1] || accessToken;

  return _app
    .fetch(`${_app.canPassApi}/authenticate?access_token=${_accessToken}`)
    .then(res => res.json());
}

interface TokenOutput {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

function refreshAccessToken(
  refreshToken: string,
  clientSecret: ClientSecret,
): Promise<TokenOutput> {
  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return _app
    .fetch(_app.canPassApi + '/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${clientSecret.client_id}:${clientSecret.client_secret}`,
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
    .then(resp => resp.json())
    .catch(err => {
      logger.error(_app.canPassApi, err);
      return err;
    });
}

export default {
  config,
  verify,
  refreshAccessToken,
};
