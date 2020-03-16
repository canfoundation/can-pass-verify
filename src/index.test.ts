import fetch from 'node-fetch';
import index from './index';
import { logger } from './shares/logger';

xdescribe('test index', () => {
  const configs = {
    canPassApi: process.env.app_can_pass_api,
    fetch,
  };

  index.config(configs);

  it('should refresh access token', async () => {
    const refreshToken = 'f03a2b78f07304bcbf6c0a1caeba193539b1eaf5';
    const clientSecret = {
      client_id: process.env.app_client_id,
      client_secret: process.env.app_client_secret,
    };
    const tokenOutput = await index.refreshAccessToken(
      refreshToken,
      clientSecret,
    );
    logger.debug(refreshToken, tokenOutput);
  });

  it('should verify access token', async () => {
    const accessToken = '508d35ee05095d6927b2dfecafe84a5b0c40c9e2';
    const res = await index.verify(accessToken);
    logger.debug(res);
  });
});
