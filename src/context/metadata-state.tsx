import React, { useContext } from 'react';
import { MetadataMutationContext } from '@/context/metadata-mutation';
import { MetadataObjectType } from '@purplship/graphql';
import { isNone, isNoneOrEmpty } from '@/lib/helper';

type MetaPair = { key?: string; value?: string };
type MetaRecord = Record<string, MetaPair>;
type OperationType = {
  onChange?: (metadata: any) => void;
};
type MetadataProviderComponent = {
  id?: string;
  object_type: MetadataObjectType;
  value?: {}
}
interface MetadataStateInterface {
  state: MetaRecord;
  error: any | Error;
  saveMetadata: (operation?: OperationType) => void;
  updateItem: (uid: string, value: MetaPair) => void;
  removeItem: (key: string) => void;
  addItem: () => void;
  reset: () => void;
}

export const MetadataStateContext = React.createContext<MetadataStateInterface>({} as MetadataStateInterface);

const MetadataStateProvider: React.FC<MetadataProviderComponent> = ({ children, id, object_type, value }) => {
  const { mutateMetadata } = useContext(MetadataMutationContext);
  const [state, setState] = React.useState<MetaRecord>(to_object_record(value));
  const [error, setError] = React.useState<any | Error>(null);

  const saveMetadata = async (operation?: OperationType) => {
    setError(null);
    try {
      let added_values = Object
        .values(state)
        .reduce((acc, { key, value }) => {
          // This means that the metadata has been emptied
          if (isNone(key) && isNone(value) && Object.keys(state).length == 1) {
            return acc;
          }
          // This means that we have more than one metadata items with the same key
          if (Object.keys(acc).includes(key as string)) {
            let error: any | Error = new Error('Metadata keys must be unique.');
            error.key = key;
            throw error;
          }
          // This means that the metadata item has undefined key and/or value
          if (isNoneOrEmpty(key) || isNoneOrEmpty(value)) {
            let error: any | Error = new Error('Metadata keys and values are required.');
            error.key = key;
            throw error;
          }
          return { ...acc, [key as string]: value };
        }, {});
      let discarded_keys = Object
        .keys(value || {})
        .filter(key => !Object.keys(added_values).includes(key));

      id && await mutateMetadata({
        id,
        object_type,
        discarded_keys,
        added_values,
      })

      operation?.onChange && operation.onChange(added_values);
    } catch (error) {
      setError(error);
    }
  };
  const updateItem = (uid: string, value: MetaPair) => {
    setError(null);
    setState({ ...state, [uid]: value });
  };
  const removeItem = (uid: string) => {
    setError(null);
    let newState = Object.entries(state).reduce((acc, [k, v]) => (
      k === uid ? acc : { ...acc, [k]: v }
    ), {});

    setState(
      Object.keys(newState).length > 0
        ? newState
        : { [`key-${Date.now()}`]: {} }
    );
  };
  const addItem = () => {
    setError(null);
    setState({ ...state, [`key-${Date.now()}`]: {} });
  };
  const reset = () => {
    setError(null);
    setState(to_object_record(value));
  };

  return (
    <>
      <MetadataStateContext.Provider value={{
        state,
        error,
        saveMetadata,
        updateItem,
        removeItem,
        addItem,
        reset,
      }}>
        {children}
      </MetadataStateContext.Provider>
    </>
  )
};

function to_object_record(value?: {}): MetaRecord {
  return Object
    .entries(value || {})
    .reduce((acc, [key, value], index) => ({
      ...acc,
      [`key-${index}-${Date.now()}`]: { key, value }
    }), {});
}

export default MetadataStateProvider;
