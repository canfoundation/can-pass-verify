import { VerifyApiKeyConfig, VerifyApiKeyInput, VerifyApiKeyOutput } from './shares/ApiKey';
import gql from './shares/gql';
import { Header } from './shares/Header';
import utils from './shares/utils';
import { VerifyInternalOutput } from './shares/VerifyInternalOutput';
import validateCognitoToken, { CognitoExpressConfig } from './validateCognitoToken';

function verifyInternal(
  header: Header,
  config: CognitoExpressConfig,
): Promise<VerifyInternalOutput> {
  let idToken = utils.getHeaderHelper(header, 'can-id-token');
  if (utils.isEmpty(idToken)) {
    const cookie = utils.getCookiesFromHeader(header);
    idToken = utils.get(cookie, 'can-id-token');
  }

  if (utils.isEmpty(idToken)) {
    return Promise.reject('Can not find can-id-token from header');
  }

  return validateCognitoToken.validateToken(idToken, 'id', config).then(user => {
    const userId = utils.get(user, 'cognito:username');
    return {
      ...user,
      id: userId,
    };
  });
}

function verifyApiKey(
  input: VerifyApiKeyInput,
  config: VerifyApiKeyConfig,
): Promise<VerifyApiKeyOutput> {
  return gql(config.fetch, config.canpassApiKeyEndpoint, {
    query: `query verifyApiKey(
      $accessKey: String!
      $adminKey: String
      $displayerKey: String
    ) {
      verifyApiKey(
        accessKey: $accessKey
        adminKey: $adminKey
        displayerKey: $displayerKey
      ) {
        ownerId
        accessKey
        adminKey
        displayerKey
      }
    }`,
    headers: config.headers,
    variables: input,
  }).then(({ data }) => utils.get(data, 'verifyApiKey'));
}

export { verifyInternal, verifyApiKey };
export default { verifyInternal, verifyApiKey };
