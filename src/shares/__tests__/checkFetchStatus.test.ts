import checkFetchStatus from '../checkFetchStatus';

describe('check fetch status helper', () => {
  it('should return normaly with res.ok is truthy', () => {
    const res = {
      ok: true,
    };
    const rs = checkFetchStatus(res);
    expect(rs).toEqual(res);
  });
  it('should throw error with res.ok is falsy', () => {
    const res = {
      statusText: 'exy',
    };
    expect(() => checkFetchStatus(res)).toThrow(res.statusText);
  });
});
