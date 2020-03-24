import utils from './shares/utils';
import validateCognitoToken, {
  CognitoExpressConfig,
} from './validateCognitoToken';
import { Header } from './shares/Header';
import { VerifyInternalOutput } from './shares/VerifyInternalOutput';

function verifyInternal(
  header: Header,
  config: CognitoExpressConfig,
): Promise<VerifyInternalOutput> {
  let idToken = utils.getHeaderHelper(header, 'can-id-token');
  if (utils.isEmpty(idToken)) {
    const cookie = utils.getCookiesFromHeader(header);
    idToken = utils.get(cookie, 'can-id-token');
  }

  return validateCognitoToken
    .validateToken(idToken, 'id', config)
    .then(user => {
      const userId = utils.get(user, 'cognito:username');
      return {
        ...user,
        id: userId,
      };
    });
}

export default {
  verifyInternal,
};
