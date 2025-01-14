import React, { useEffect, useState } from 'react';
import { LazyQueryResult, useLazyQuery } from '@apollo/client';
import { get_log, GET_LOG, get_logVariables, get_log_log } from '@purplship/graphql';


type Log = get_log_log;
export type LogResultType = LazyQueryResult<get_log, get_logVariables> & {
  log?: Log;
  loadLog: (id: string) => Promise<any>;
  setLog: React.Dispatch<React.SetStateAction<get_log_log | undefined>>;
};

export const Log = React.createContext<LogResultType>({} as LogResultType);

const LogProvider: React.FC = ({ children }) => {
  const [load, result] = useLazyQuery<get_log, get_logVariables>(GET_LOG, {
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
  });
  const [log, setLog] = useState<Log>();

  const loadLog = (id: string) => load({ variables: { id: parseInt(id) } });

  useEffect(() => { setLog(result.data?.log as Log); }, [result]);

  return (
    <Log.Provider value={{
      log,
      setLog,
      loadLog,
      ...result
    }}>
      {children}
    </Log.Provider>
  );
};

export default LogProvider;
