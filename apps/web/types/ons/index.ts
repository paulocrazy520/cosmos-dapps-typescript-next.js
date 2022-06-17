export declare type OnsWhoisResponse = {
  pagination: {
    next_key: string;
    total: string;
  };
  whois: OnsName[];
};
export declare type OnsName = {
  index: string;
  name: string;
  value: string;
  price: string;
  owner: string;
};
export declare type OnsParams = {};
