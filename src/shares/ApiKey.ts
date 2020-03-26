import { Fetch } from './types';
import { Header } from './Header';

export interface VerifyApiKeyInput {
  accessKey: string;
  adminKey?: string;
  displayerKey?: string;
}

export interface VerifyApiKeyOutput {
  ownerId: string;
  accessKey: boolean;
  adminKey: boolean;
  displayerKey: boolean;
}

export interface VerifyApiKeyConfig {
  fetch: Fetch;
  canpassApiKeyEndpoint: string;
  headers: Header;
}
