import gql from '../gql';

describe('test gql', () => {
  it('should query', async () => {
    const res = {
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    };
    const fetch = jest.fn().mockResolvedValue(Promise.resolve(res));
    const url = 'url://hello';
    const queryInput = {
      query: `query hello($msg: String) {
        hello(msg: $msg)
      }`,
      variables: {
        msg: 'sent check health message',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await gql(fetch, url, queryInput);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('url://hello', {
      body:
        '{"query":"query hello($msg: String) { hello(msg: $msg) }","variables":{"msg":"sent check health message"}}',
      headers: queryInput.headers,
      method: 'POST',
    });
    expect(res.json).toBeCalledTimes(1);
  });

  it('should throw error', async () => {
    const res = {
      ok: true,
      json: jest.fn().mockResolvedValue({
        errors: [
          {
            message: 'fake error',
          },
        ],
      }),
    };
    const fetch = jest.fn().mockResolvedValue(Promise.resolve(res));
    const url = 'url://hello';
    const queryInput = {
      query: `query hello($msg: String) {
        hello(msg: $msg)
      }`,
      variables: {
        msg: 'sent check health message',
      },
      headers: {
        'Content-Type': 'application/json',
      },
    };

    await expect(gql(fetch, url, queryInput)).rejects.toEqual([{ message: 'fake error' }]);

    expect(fetch).toBeCalledTimes(1);
    expect(fetch).toBeCalledWith('url://hello', {
      body:
        '{"query":"query hello($msg: String) { hello(msg: $msg) }","variables":{"msg":"sent check health message"}}',
      headers: queryInput.headers,
      method: 'POST',
    });
    expect(res.json).toBeCalledTimes(1);
  });
});
