export declare interface AccountResponse {
  account: {
    "@type": string;
    address: string;
    pub_key: {
      "@type": string;
      key: string;
    };
    account_number: string;
    sequence: string;
  };
}
export declare interface Account {
  "@type": string;
  address: string;
  pub_key: {
    "@type": string;
    key: string;
  };
  account_number: string;
  sequence: string;
}
export declare type AuthParamsResponse = {
  params: {
    max_memo_characters: string;
    tx_sig_limit: string;
    tx_size_cost_per_byte: string;
    sig_verify_cost_ed25519: string;
    sig_verify_cost_secp256k1: string;
  };
};
export declare type AuthParams = {
  max_memo_characters: string;
  tx_sig_limit: string;
  tx_size_cost_per_byte: string;
  sig_verify_cost_ed25519: string;
  sig_verify_cost_secp256k1: string;
};
