import { Header } from './Header';

function getHeaderHelper(header: Header = {}, name = ''): string {
  const key = Object.keys(header).find(
    k => k.toLowerCase() === name.toLowerCase(),
  );

  if (key) return header[key] || '';
  return '';
}

function isEmpty(s: string) {
  return !s;
}

function get(obj, key) {
  if (!obj) return;
  return obj[key];
}

function getCookiesFromHeader(header: Header) {
  const rc = getHeaderHelper(header, 'cookie');
  const list = {};

  if (isEmpty(rc)) {
    return list;
  }

  // Split a cookie string in an array (Originally found http://stackoverflow.com/a/3409200/1427439)
  rc.split(';').forEach(cookie => {
    const parts = cookie.split('=');
    const key = parts.shift().trim();
    const value = decodeURI(parts.join('='));
    if (key !== '') {
      list[key] = value;
    }
  });

  return list;
}

export default {
  isEmpty,
  get,
  getHeaderHelper,
  getCookiesFromHeader,
};
