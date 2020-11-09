import { RequestInfo, RequestInit, Response } from 'node-fetch';
import { URLSearchParams } from 'url';

import checkFetchStatus from './shares/checkFetchStatus';
import { logger } from './shares/logger';

export interface Configs {
  canPassApi: string;
  fetch: (url: RequestInfo, init?: RequestInit) => Promise<Response>;
}

export interface ClientSecret {
  client_id: string;
  client_secret: string;
}

export interface VerifyOutput {
  applicationId: string;
  clientId: string;
  userId: string;
  scope: string;
  scopes: string[];
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
  isPublic: boolean;
  isTrusted: boolean;
  createdAt: string;
  updatedAt: string;
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

function verify(accessToken: string): Promise<VerifyOutput | undefined> {
  // handle case access-token start with `Bearer <access-token>`
  const _accessToken = accessToken.split(' ')[1] || accessToken;

  return _app
    .fetch(`${_app.canPassApi}/authenticate?access_token=${_accessToken}`)
    .then(checkFetchStatus)
    .then(res => res.json())
    .then(res => {
      if (!res.active) {
        throw new Error('Access token is not active.');
      }

      return res as VerifyOutput;
    });
}

export interface TokenOutput {
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
    .then(checkFetchStatus)
    .then(res => res.json())
    .catch(err => {
      logger.error(_app.canPassApi, err);
      throw err;
    });
}

export interface GetTokenInput {
  code: string;
  redirect_uri: string;
}

/**
 * Exchange authorization_code to get access-token
 * More information at: https://oauth.net/2/grant-types/authorization-code/
 */
function getToken(input: GetTokenInput, clientSecret: ClientSecret): Promise<TokenOutput> {
  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: input.code,
    redirect_uri: input.redirect_uri,
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
    .then(checkFetchStatus)
    .then(res => res.json())
    .catch(err => {
      logger.error(_app.canPassApi, err);
      throw err;
    });
}

export { config, verify, refreshAccessToken, getToken };
export default { config, verify, refreshAccessToken, getToken };
