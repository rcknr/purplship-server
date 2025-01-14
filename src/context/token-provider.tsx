import React from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { GetToken, GetToken_token, GET_TOKEN } from '@purplship/graphql';
import { insertUrlParam } from '@/lib/helper';

export type TokenType = GetToken_token;
type TokenDataType = LazyQueryResult<GetToken, any> & {
  token: TokenType;
  load: () => Promise<any>;
  authenticateOrg: (org_id: string) => Promise<any | undefined>
};

export const TokenData = React.createContext<TokenDataType>({ token: { key: '' } } as TokenDataType);

const TokenProvider: React.FC = ({ children }) => {
  const [initialLoad, result] = useLazyQuery<GetToken>(GET_TOKEN, { notifyOnNetworkStatusChange: true });

  const fetchMore = (options: any) => result.called ? result.fetchMore(options) : initialLoad(options);
  const load = () => result.called ? fetchMore({}) : initialLoad({});
  const authenticateOrg = async (org_id: string) => {
    await fetch(`/api/orgauth?org_id=${org_id}`);
    insertUrlParam({});
    setTimeout(() => location.reload(), 800);
  };

  return (
    <TokenData.Provider value={{ load, authenticateOrg, token: (result?.data?.token || {} as TokenType), ...result }}>
      {children}
    </TokenData.Provider>
  );
};

export default TokenProvider;
