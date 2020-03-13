import { RequestInfo, RequestInit, Response } from 'node-fetch';
import { URLSearchParams } from 'url';
import { logger } from './shares/logger';

interface Options {
  client_id: string;
  client_secret: string;
  canPassApi: string;
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
}

type Partial<T> = {
  [P in keyof T]?: T[P];
};

interface VerifyOutput {
  scope: string;
  userId: string;
}

const _app: Options = {
  client_id: null,
  client_secret: null,
  canPassApi: null,
  fetch: null,
};

/**
 * config global
 * @param options
 */
function config(options: Options) {
  Object.assign(_app, options);
}

function verify(
  accessToken: string,
  options?: Partial<Options>,
): Promise<VerifyOutput> {
  const app = Object.assign({}, _app, options);
  return app
    .fetch(
      `${app.canPassApi}/authenticate?access_token=${accessToken.split(
        ' ',
      )[1] || accessToken}`,
    )
    .then(res => res.json());
}

interface TokenOutput {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

async function refreshAccessToken(
  refreshToken: string,
  options?: Partial<Options>,
): Promise<TokenOutput> {
  const app = Object.assign({}, _app, options);

  const params = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });

  return app
    .fetch(app.canPassApi + '/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${app.client_id}:${app.client_secret}`,
        ).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    })
    .then(resp => resp.json())
    .catch(err => {
      logger.error(app.canPassApi, err);
      return err;
    });
}

export default {
  config,
  verify,
  refreshAccessToken,
};
