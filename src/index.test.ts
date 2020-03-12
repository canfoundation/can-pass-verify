import fetch from 'node-fetch';
import index from './index';
import { logger } from './shares/logger';

describe('test index', () => {
  const app = {
    client_id: process.env.app_client_id,
    client_secret: process.env.app_client_secret,
    canPassApi: process.env.app_can_pass_api,
    fetch,
  };

  index.config(app);

  xit('should refresh access token', async () => {
    const refreshToken = 'f03a2b78f07304bcbf6c0a1caeba193539b1eaf5';
    await index.refreshAccessToken(refreshToken);
    logger.debug(refreshToken);
  });

  xit('should verify access token', async () => {
    const accessToken = 'b918faaa50da8bf16bb2d080506a8ab81eb36eea';
    const res = await index.verify(accessToken);
    logger.debug(res);
  });
});
