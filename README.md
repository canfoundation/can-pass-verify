# can-pass-verify

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Build Status](https://travis-ci.org/canfoundation/can-pass-verify.svg?branch=master)](https://travis-ci.org/canfoundation/can-pass-verify)

can-pass-verify provides utility functions for working with the can-pass tokens.

## Installation

[![NPM](https://img.shields.io/npm/v/can-pass-verify.svg)](https://www.npmjs.org/package/can-pass-verify)

[![https://nodei.co/npm/can-pass-verify.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/can-pass-verify.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/can-pass-verify)

```bash
npm install can-pass-verify
```

or

```bash
yarn can-pass-verify
```

## Features

- get header helper

```typescript
import canPass from 'can-pass-verify/lib/shares/utils';

const authorization = canPass.getHeaderHelper(headers, 'Authorization');
```

- verify access token
- get new access token
- get token

```typescript
import canPass from 'can-pass-verify';
import fetch from 'node-fetch';

// global config
canPass.config({
  canPassApi: process.env.app_can_pass_api,
  fetch,
});

let u = await canPass.verify(accessToken);

// refreshAccessToken
u = await canPass.refreshAccessToken(refreshToken, {
  client_secret: '<your client secret - never publish it>',
  client_id: '<your client id>',
});

// getToken
u = await canPass.getToken(
  {
    code: '<code is return from login process>',
    redirect_uri: '<redirect_uri must match with one send through login process>',
  },
  {
    client_secret: '<your client secret - never publish it>',
    client_id: '<your client id>',
  },
);
```
