import '../shares/loadEnv';
import index, { GetTokenInput } from '../index';
import { URLSearchParams } from 'url';
import { logger } from '../shares/logger';

jest.mock('../shares/logger');

describe('test index', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('refresh token', () => {
    it('should refresh access token', async () => {
      const fetchRes = {
        ok: true,
        json: jest.fn(),
      };
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockResolvedValue(fetchRes),
      };

      index.config(configs);
      const refreshToken = 'f03a2b78f07304bcbf6c0a1caeba193539b1eaf5';
      const clientSecret = {
        client_id: process.env.app_client_id,
        client_secret: process.env.app_client_secret,
      };
      await index.refreshAccessToken(refreshToken, clientSecret);

      expect(configs.fetch).toBeCalledTimes(1);
      expect(configs.fetch).toBeCalledWith(configs.canPassApi + '/token', {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic NTE0NzQ0ZmUyMzU2ZWNkNTg1Nzg5ZWJkZGZlY2IwODc6NmI4OGM4ZTIxNWNiMWM2MmRlYjA3YzdlMTc2ZmJiMWI2Njc5OTcwNTI0NmRiNTAyMTI3ZDJkZDkyY2M3YmZmNQ==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        method: 'POST',
      });
      expect(fetchRes.json).toBeCalledTimes(1);
      expect(fetchRes.json).toBeCalledWith();
    });

    it('handle error', async () => {
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockRejectedValue('fake error'),
      };

      index.config(configs);
      const refreshToken = 'f03a2b78f07304bcbf6c0a1caeba193539b1eaf5';
      const clientSecret = {
        client_id: process.env.app_client_id,
        client_secret: process.env.app_client_secret,
      };
      await expect(index.refreshAccessToken(refreshToken, clientSecret)).rejects.toEqual(
        'fake error',
      );

      expect(configs.fetch).toBeCalledTimes(1);
      expect(configs.fetch).toBeCalledWith(configs.canPassApi + '/token', {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic NTE0NzQ0ZmUyMzU2ZWNkNTg1Nzg5ZWJkZGZlY2IwODc6NmI4OGM4ZTIxNWNiMWM2MmRlYjA3YzdlMTc2ZmJiMWI2Njc5OTcwNTI0NmRiNTAyMTI3ZDJkZDkyY2M3YmZmNQ==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
        method: 'POST',
      });

      expect(logger.error).toBeCalledTimes(1);
      expect(logger.error).toBeCalledWith(configs.canPassApi, 'fake error');
    });
  });

  describe('test verify', () => {
    it('should verify access token', async () => {
      const fetchRes = {
        ok: true,
        json: () => ({
          active: true,
          userId: 'test',
        }),
      };
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockResolvedValue(fetchRes),
      };

      index.config(configs);

      const accessToken = 'badc';
      const result = await index.verify(accessToken);
      expect(configs.fetch).toBeCalledTimes(1);
      expect(configs.fetch).toBeCalledWith(
        `${configs.canPassApi}/authenticate?access_token=${accessToken}`,
      );
      expect(result.userId).toBe('test');
    });

    it('should verify `Bearer` access token', async () => {
      const fetchRes = {
        ok: true,
        json: () => ({
          active: true,
          userId: 'test',
        }),
      };
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockResolvedValue(fetchRes),
      };

      index.config(configs);

      const accessToken = 'Bearer badc';
      const result = await index.verify(accessToken);
      expect(configs.fetch).toBeCalledTimes(1);
      expect(configs.fetch).toBeCalledWith(`${configs.canPassApi}/authenticate?access_token=badc`);
      expect(result.userId).toBe('test');
    });

    it('should throw error', async () => {
      const fetchRes = {
        ok: false,
        statusText: 'Bad Request',
        json: () => ({
          active: false,
        }),
      };
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockResolvedValue(fetchRes),
      };

      index.config(configs);

      await expect(index.verify('test')).rejects.toThrow('Bad Request');
      expect(configs.fetch).toBeCalledTimes(1);
    });

    it('should return undefined for invalid token', async () => {
      const fetchRes = {
        ok: true,
        json: () => ({
          active: false,
        }),
      };
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockResolvedValue(fetchRes),
      };

      index.config(configs);

      const result = await index.verify('test');
      expect(configs.fetch).toBeCalledTimes(1);
      expect(result).toBeUndefined();
    });
  });

  describe('getToken', () => {
    it('should refresh access token', async () => {
      const fetchRes = {
        ok: true,
        json: jest.fn(),
      };
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockResolvedValue(fetchRes),
      };

      index.config(configs);
      const input: GetTokenInput = {
        redirect_uri: 'uuii',
        code: 'any-code',
      };
      const clientSecret = {
        client_id: process.env.app_client_id,
        client_secret: process.env.app_client_secret,
      };
      await index.getToken(input, clientSecret);

      expect(configs.fetch).toBeCalledTimes(1);
      expect(configs.fetch).toBeCalledWith(configs.canPassApi + '/token', {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic NTE0NzQ0ZmUyMzU2ZWNkNTg1Nzg5ZWJkZGZlY2IwODc6NmI4OGM4ZTIxNWNiMWM2MmRlYjA3YzdlMTc2ZmJiMWI2Njc5OTcwNTI0NmRiNTAyMTI3ZDJkZDkyY2M3YmZmNQ==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: input.code,
          redirect_uri: input.redirect_uri,
        }),
        method: 'POST',
      });
      expect(fetchRes.json).toBeCalledTimes(1);
      expect(fetchRes.json).toBeCalledWith();
    });

    it('handle error', async () => {
      const configs = {
        canPassApi: process.env.app_can_pass_api,
        fetch: jest.fn().mockRejectedValue('fake error'),
      };

      index.config(configs);
      const input: GetTokenInput = {
        redirect_uri: 'uuii',
        code: 'any-code',
      };
      const clientSecret = {
        client_id: process.env.app_client_id,
        client_secret: process.env.app_client_secret,
      };
      await expect(index.getToken(input, clientSecret)).rejects.toEqual('fake error');

      expect(configs.fetch).toBeCalledTimes(1);
      expect(configs.fetch).toBeCalledWith(configs.canPassApi + '/token', {
        headers: {
          Accept: 'application/json',
          Authorization:
            'Basic NTE0NzQ0ZmUyMzU2ZWNkNTg1Nzg5ZWJkZGZlY2IwODc6NmI4OGM4ZTIxNWNiMWM2MmRlYjA3YzdlMTc2ZmJiMWI2Njc5OTcwNTI0NmRiNTAyMTI3ZDJkZDkyY2M3YmZmNQ==',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: input.code,
          redirect_uri: input.redirect_uri,
        }),
        method: 'POST',
      });

      expect(logger.error).toBeCalledTimes(1);
      expect(logger.error).toBeCalledWith(configs.canPassApi, 'fake error');
    });
  });
});
