import checkFetchStatus from './checkFetchStatus';
import { Header } from './Header';
import { Fetch } from './types';

interface GqlParams {
  query: string;
  variables?: { [key: string]: any };
  headers?: Header;
}

const gql = (fetch: Fetch, url: string, gqlParams: GqlParams): Promise<any> => {
  const { headers, query: _query, variables } = gqlParams;
  const query = _query.replace(/\s+/g, ' ');

  return fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
    .then(checkFetchStatus)
    .then(r => r.json())
    .then(r => {
      if (r.errors) throw r.errors;
      return r;
    });
};

export default gql;
