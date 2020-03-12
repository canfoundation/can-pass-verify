function getHeaderHelper(headers: any = {}, name = ''): string {
  const key = Object.keys(headers).find(
    k => k.toLowerCase() === name.toLowerCase(),
  );

  if (key) return headers[key] || '';
  return '';
}

export default {
  getHeaderHelper,
};
