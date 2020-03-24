export interface VerifyInternalOutput {
  email_verified: boolean;
  token_use: 'id' | 'access';
  exp: number;
  iat: number;
  email: string;
  id: string;
}
