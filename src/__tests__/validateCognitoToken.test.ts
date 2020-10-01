import CognitoExpress from 'cognito-express';

import validateCognitoToken from '../validateCognitoToken';

jest.mock('cognito-express');

describe('test validateCognitoToken', () => {
  it('token is falsy', async () => {
    const token = null;
    const type = 'id';
    const config = {
      region: 'ijkje',
      cognitoUserPoolId: 'ijkje',
    };
    await expect(validateCognitoToken.validateToken(token, type, config)).resolves.toBeUndefined();
  });
  it('token is truthy', async () => {
    const token = 'fake token';
    const type = 'id';
    const config = {
      region: 'ijkje',
      cognitoUserPoolId: 'ijkje',
    };

    const ce = {
      validate: jest.fn((_token, callback) => {
        callback(null, { a: 'e' });
      }),
    };
    (CognitoExpress as jest.Mock).mockReturnValue(ce);

    await expect(validateCognitoToken.validateToken(token, type, config)).resolves.toEqual({
      a: 'e',
    });
  });
  it('token is truthy but throw error', async () => {
    const token = 'fake token';
    const type = 'id';
    const config = {
      region: 'ijkje',
      cognitoUserPoolId: 'ijkje',
    };

    const ce = {
      validate: jest.fn((_token, callback) => {
        callback('fake error', { a: 'e' });
      }),
    };
    (CognitoExpress as jest.Mock).mockReturnValue(ce);

    await expect(validateCognitoToken.validateToken(token, type, config)).rejects.toEqual(
      'fake error',
    );
  });
});
