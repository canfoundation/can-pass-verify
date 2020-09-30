import utils from '../utils';

describe('test utilities', () => {
  describe('get header', () => {
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

    it('should getheaderhelper no passed param', () => {
      expect(utils.getHeaderHelper()).toEqual('');
    });

    it('should getheaderhelper key is null', () => {
      expect(utils.getHeaderHelper({ k: null }, 'k')).toEqual('');
    });
  });

  it('should check is empty', async () => {
    expect(utils.isEmpty('')).toEqual(true);
    expect(utils.isEmpty(null)).toEqual(true);
    expect(utils.isEmpty(undefined)).toEqual(true);

    expect(utils.isEmpty(' ')).toEqual(false);
  });

  describe('get', () => {
    it('test get', () => {
      expect(utils.get({ a: 'b' }, 'a')).toEqual('b');
    });

    it('test get null object', () => {
      expect(utils.get(null, 'a')).toBeUndefined();
    });
  });

  describe('get cookie', () => {
    it('should get empty cookies from headers', () => {
      expect(utils.getCookiesFromHeader({})).toEqual({});
    });

    it('should get cookies from headers', () => {
      expect(
        utils.getCookiesFromHeader({
          cookie: 'a=b;c=d',
        }),
      ).toEqual({ a: 'b', c: 'd' });
    });
    it('key is empty string', () => {
      expect(
        utils.getCookiesFromHeader({
          cookie: '=b;c=d',
        }),
      ).toEqual({ c: 'd' });
    });
  });
});
