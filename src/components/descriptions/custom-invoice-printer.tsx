import { ShipmentType } from '@/lib/types';
import React, { useState } from 'react';


type CustomInvoicePrinterContextType = {
  printInvoice: (shipment: ShipmentType) => void,
};

export const CustomInvoicePrinterContext = React.createContext<CustomInvoicePrinterContextType>({} as CustomInvoicePrinterContextType);

interface CustomInvoicePrinterComponent extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const CustomInvoicePrinter: React.FC<CustomInvoicePrinterComponent> = ({ children }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [shipment, setShipment] = useState<ShipmentType>();

  const printInvoice = (shipment: ShipmentType) => {
    setIsActive(true);
    setShipment(shipment);
  };
  const close = (evt?: React.MouseEvent) => {
    evt?.preventDefault();
    setIsActive(false);
    setShipment(undefined);
  };
  const conputeSource = (shipment: ShipmentType) => {
    return `data:application/pdf;base64, ${encodeURI((shipment?.meta as any).invoice as string)}`;
  };

  return (
    <>
      <CustomInvoicePrinterContext.Provider value={{ printInvoice }}>
        {children}
      </CustomInvoicePrinterContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`}>
        <div className="modal-background" onClick={close}></div>
        <div className="label-container">

          {isActive && <iframe src={conputeSource(shipment as ShipmentType)} height="100%" width="100%"></iframe>}

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </>
  )
};

export default CustomInvoicePrinter;
