import React, { useContext, useState } from 'react';
import { Address, Customs, Parcel, PurplshipClient, Shipment } from '@/purplship/rest/index';
import { handleFailure } from '@/lib/helper';
import { RequestError } from '@/lib/types';
import { RestContext } from '@/client/context';

const DEFAULT_SHIPMENT_DATA = {
  shipper: {} as Address,
  recipient: {} as Address,
  parcels: [] as Parcel[],
  options: {}
} as Shipment;

type ShipmentType = Shipment | Shipment & { customs: Customs & { options: any } };

type LabelDataContext = {
  shipment: ShipmentType;
  loading: boolean;
  called: boolean;
  error?: RequestError;
  loadShipment: (id?: string) => Promise<Shipment>;
  updateShipment: (data: Partial<Shipment>) => void;
};

export const LabelData = React.createContext<LabelDataContext>({} as LabelDataContext);

const ShipmentProvider: React.FC = ({ children }) => {
  const purplship = useContext(RestContext);
  const [error, setError] = useState<RequestError>();
  const [shipment, setValue] = useState<Shipment>(DEFAULT_SHIPMENT_DATA);
  const [loading, setLoading] = useState<boolean>(false);
  const [called, setCalled] = useState<boolean>(false);

  const loadShipment = async (id?: string) => {
    setError(undefined);
    setLoading(true);
    setCalled(true);

    return new Promise<Shipment>(async (resolve) => {
      if (id === 'new') {
        setValue(DEFAULT_SHIPMENT_DATA);
        setLoading(false);
        return resolve(DEFAULT_SHIPMENT_DATA);
      }

      await handleFailure(
        (purplship as PurplshipClient).shipments.retrieve({ id: id as string }),
      )
        .then(r => { setValue(r as any); resolve(r as any); })
        .catch(e => { setError(e); setValue({} as Shipment); })
        .then(() => setLoading(false));
    });
  };
  const updateShipment = (data: Partial<Shipment>) => {
    const new_state = { ...shipment, ...data };
    Object.entries(data).forEach(([key, val]) => {
      if (val === undefined) delete new_state[key as keyof Shipment];
    });
    setValue(new_state);
  };

  return (
    <LabelData.Provider value={{
      shipment,
      error,
      called,
      loading,
      loadShipment,
      updateShipment
    }}>
      {children}
    </LabelData.Provider>
  );
};

export default ShipmentProvider;