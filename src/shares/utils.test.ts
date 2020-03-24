import utils from './utils';

describe('test utilities', () => {
  it('should getHeaderHelper', async () => {
    const headers = {
      aaA: 'a',
      bbb: 'a',
      BaB: 'a',
    };
    expect(utils.getHeaderHelper(headers, 'aAa')).toEqual('a');
    expect(utils.getHeaderHelper(headers, 'bBb')).toEqual('a');
    expect(utils.getHeaderHelper(headers, 'bAB')).toEqual('a');
    expect(utils.getHeaderHelper(headers, 'bAa')).toEqual('');
  });

  it('should check is empty', async () => {
    expect(utils.isEmpty('')).toEqual(true);
    expect(utils.isEmpty(null)).toEqual(true);
    expect(utils.isEmpty(undefined)).toEqual(true);

    expect(utils.isEmpty(' ')).toEqual(false);
  });
});
