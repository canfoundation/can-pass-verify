import fetch from 'node-fetch';
import internal from './internal';
import { logger } from './shares/logger';
import { Header } from './shares/Header';
import { VerifyApiKeyConfig, VerifyApiKeyInput } from './shares/ApiKey';

describe('test internal', () => {
  xit('should verify internal', async () => {
    const header: Header = {
      'can-id-token':
        'eyJraWQiOiJma05POVJBXC9Zdm45NlFvNUloQ0FJdXl4bnRYRWRUWEFreTdLdmFGcUR5dz0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiI3NmU1OTRlZS03ZTcxLTQ4MmYtOGE4Yi1mZDA5NDZiZGI0NTQiLCJ3ZWJzaXRlIjoiXC8iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicHJvZmlsZSI6Im1hbmh2dTE2IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoZWFzdC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoZWFzdC0xX0d3WjRoUU9WWSIsImNvZ25pdG86dXNlcm5hbWUiOiI3NmU1OTRlZS03ZTcxLTQ4MmYtOGE4Yi1mZDA5NDZiZGI0NTQiLCJwaWN0dXJlIjoie1wia2V5XCI6XCJkcm9wLW9mLXdhdGVyLTM1MTc3OF82NDAuanBnXCIsXCJpZGVudGl0eUlkXCI6XCJhcC1zb3V0aGVhc3QtMTo3M2ExMjE1Yy00YjcyLTQzYTgtYjNmZS0yZjkyNjM2MWQzZjVcIn0iLCJhdWQiOiI3MDdmMXZ0MjNzMWpubGVha2Z2bGl1Zm50ayIsImV2ZW50X2lkIjoiYTM0MzBhYTgtMmE4YS00MzgzLThhODUtMjhlMTUwYzY4MjEzIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE1ODUwMzA0ODUsIm5hbWUiOiJtYW5odnUxNiIsIm5pY2tuYW1lIjoie1widW5pdmVyc2l0eVBhdGhcIjpcIlwiLFwiaGFzQWNjZXNzZWRNeVByb2ZpbGVcIjpmYWxzZSxcImNvbG9yXCI6e1widGV4dFwiOlwiI2ZmZmZmZlwiLFwiYmFja2dyb3VuZFwiOlwiIzI5MTY4ZlwifSxcImxvY2FsZVwiOlwiZW5cIn0iLCJleHAiOjE1ODUwNDk2MjgsImlhdCI6MTU4NTA0NjAyOCwiZW1haWwiOiJtYW5odnUxNkB5b3BtYWlsLmNvbSJ9.FUAabOQAYk0I8j561NdR-gstTdEuXhzapYhUkk1CcVFYpDDmKQnsnUFrMP2tnlIpAQSZrjeG8SRM4LgNU71qUyOT7sPKz6y2ia6L5MiyDzKCTNK0xFyTcoPmFSf0Cqybp8N9Qz71Uio8yEAoZs9PApofNm7zwEPfpeUkvAOVXQBqFAlwWQR6wwuPpE7ym0kyrUgegmL_rfRFdk3n5DSW6AyaqeXDKHJWSQ6Vr2pYwlsbPJNSlFg4hXsdHYoRj7CYVT5PAwdC0QDXPnIC-mzvBNkYar1HDzl-DteFt9gcTBmIKuUIf4AmGdn6ROlfOIGu9ImQ2vlSbpjApSlF4YvS9w',
    };

    const res = await internal.verifyInternal(header, {
      region: 'ap-southeast-1',
      cognitoUserPoolId: 'ap-southeast-1_GwZ4hQOVY',
    });
    logger.debug(res);
    expect(res).toEqual({
      sub: '76e594ee-7e71-482f-8a8b-fd0946bdb454',
      website: '/',
      email_verified: true,
      profile: 'manhvu16',
      iss:
        'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_GwZ4hQOVY',
      'cognito:username': '76e594ee-7e71-482f-8a8b-fd0946bdb454',
      picture:
        '{"key":"drop-of-water-351778_640.jpg","identityId":"ap-southeast-1:73a1215c-4b72-43a8-b3fe-2f926361d3f5"}',
      aud: '707f1vt23s1jnleakfvliufntk',
      event_id: 'a3430aa8-2a8a-4383-8a85-28e150c68213',
      token_use: 'id',
      auth_time: 1585030485,
      name: 'manhvu16',
      nickname:
        '{"universityPath":"","hasAccessedMyProfile":false,"color":{"text":"#ffffff","background":"#29168f"},"locale":"en"}',
      exp: 1585049628,
      iat: 1585046028,
      email: 'manhvu16@yopmail.com',
      id: '76e594ee-7e71-482f-8a8b-fd0946bdb454',
    });
  });

  xit('should verify api key', async () => {
    const config: VerifyApiKeyConfig = {
      fetch,
      canpassApiKeyEndpoint:
        'https://dev.api.cryptobadge.app/api-key-test/graphql',
      headers: {
        'x-api-key': '',
      },
    };

    const input: VerifyApiKeyInput = {
      accessKey: 'Llujh0ThiuBOKOQWPHrgm',
      adminKey: '',
      displayerKey: 'nOe0KKfAh2LIT-uP6wl8w-AkjPvTETv6',
    };

    const res = await internal.verifyApiKey(input, config);
    expect(res).toBeTruthy();
    expect(res.accessKey).toBeTruthy();
    expect(res.displayerKey).toBeTruthy();
    expect(res.adminKey).toBeFalsy();
  });
});
