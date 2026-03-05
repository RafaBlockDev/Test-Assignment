export interface WalletInfo {
  address: string;
  chainId: number;
  isVerified: boolean;
}

export interface NonceResponse {
  nonce: string;
  message: string;
}

export interface RegisterRequest {
  address: string;
  chainId: number;
  signature: string;
  message: string;
}

export interface LinkWalletRequest {
  address: string;
  userId: string;
}
