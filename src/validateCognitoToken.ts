import CognitoExpress from 'cognito-express';

export interface CognitoExpressConfig {
  region: string;
  cognitoUserPoolId: string;
}

function getCognitoByType(type: 'id' | 'access', config: CognitoExpressConfig): CognitoExpress {
  return new CognitoExpress({
    region: config.region,
    cognitoUserPoolId: config.cognitoUserPoolId,
    tokenUse: type, // Possible Values: access | id
    tokenExpiration: 3600000, // Up to default expiration of 1 hour (3600000 ms)
  });
}

function validateToken(
  token: string,
  type: 'id' | 'access',
  config: CognitoExpressConfig,
): Promise<any> {
  if (!token) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const ce: CognitoExpress = getCognitoByType(type, config);
    ce.validate(token, (err, res) => {
      if (err) return reject(err);
      resolve(res);
    });
  });
}

export { validateToken };
export default { validateToken };
