import React, { useContext, useState } from 'react';
import AddressForm, { DEFAULT_ADDRESS_CONTENT } from '@/components/form-parts/address-form';
import { addUrlParam, isNone, removeUrlParam } from '@/lib/helper';
import InputField from '@/components/generic/input-field';
import CheckBoxField from './generic/checkbox-field';
import { AddressTemplateType, AddressType, NotificationType } from '@/lib/types';
import { AddressMutationContext } from '@/context/address-template-mutation';
import Notifier, { Notify } from '@/components/notifier';
import { Loading } from '@/components/loader';
import { CreateAddressTemplateInput, UpdateAddressTemplateInput } from '@purplship/graphql';
import { useRouter } from 'next/dist/client/router';

const DEFAULT_TEMPLATE_CONTENT = {
  label: '',
  is_default: false,
  address: DEFAULT_ADDRESS_CONTENT,
} as AddressTemplateType;

type OperationType = {
  addressTemplate?: AddressTemplateType;
  onConfirm: () => Promise<any>;
};
type AddressEditContextType = {
  editAddress: (operation: OperationType) => void,
};

export const AddressEditContext = React.createContext<AddressEditContextType>({} as AddressEditContextType);

interface AddressEditModalComponent { }

const AddressEditModal: React.FC<AddressEditModalComponent> = ({ children }) => {
  const { notify } = useContext(Notify);
  const { setLoading } = useContext(Loading);
  const { createAddressTemplate, updateAddressTemplate } = useContext(AddressMutationContext);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [key, setKey] = useState<string>(`address-${Date.now()}`);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [template, setTemplate] = useState<AddressTemplateType | undefined>();
  const [operation, setOperation] = useState<OperationType | undefined>();

  const editAddress = (operation: OperationType) => {
    const template = operation.addressTemplate || DEFAULT_TEMPLATE_CONTENT;

    setOperation(operation);
    setIsNew(isNone(operation.addressTemplate));
    setTemplate({ ...template });

    setIsActive(true);
    setKey(`address-${Date.now()}`);
    addUrlParam('modal', template.id || 'new');
  };
  const close = (_?: React.MouseEvent, changed?: boolean) => {
    if (isNew) setTemplate(undefined);
    if (changed && operation?.onConfirm !== undefined) operation?.onConfirm();

    setIsActive(false);
    setOperation(undefined);
    setKey(`address-${Date.now()}`);
    removeUrlParam('modal');
  };

  const handleChange = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    event.stopPropagation();

    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setTemplate({ ...template, [name]: value } as AddressTemplateType);
  };
  const handleSubmit = async ({ validation, ...address }: AddressType | any) => {
    const payload = { ...template, address };

    try {
      setLoading(true);
      if (isNew) {
        await createAddressTemplate(payload as CreateAddressTemplateInput);
        notify({ type: NotificationType.success, message: 'Address successfully added!' });
      }
      else {
        await updateAddressTemplate(payload as UpdateAddressTemplateInput);
        notify({ type: NotificationType.success, message: 'Address successfully updated!' });
      }
      setTimeout(() => close(undefined, true), 2000);
    } catch (message: any) {
      notify({ type: NotificationType.error, message });
    }
    setLoading(false);
  };

  return (
    <Notifier>
      <AddressEditContext.Provider value={{ editAddress }}>
        {children}
      </AddressEditContext.Provider>

      <div className={`modal ${isActive ? "is-active" : ""}`} key={key}>
        <div className="modal-background" onClick={close}></div>
        <div className="modal-card">

          <section className="modal-card-body modal-form">
            <div className="form-floating-header p-4">
              <span className="has-text-weight-bold is-size-6">Edit address</span>
            </div>
            <div className="p-3 my-4"></div>

            {(template !== undefined) &&
              <AddressForm
                name="template"
                value={template.address}
                onSubmit={async address => handleSubmit(address)}
                onTemplateChange={(isUnchanged) => {
                  const defaultValue = operation?.addressTemplate || DEFAULT_TEMPLATE_CONTENT;
                  return (
                    isUnchanged &&
                    template.label === defaultValue.label &&
                    template.is_default === defaultValue.is_default
                  );
                }}>

                <div className="columns mb-0">
                  <InputField
                    label="label"
                    name="label"
                    onChange={handleChange}
                    defaultValue={template?.label}
                    className="is-small"
                    fieldClass="column mb-0 px-2 py-2"
                    required />
                </div>
                <div className="columns mb-1">
                  <CheckBoxField
                    name="is_default"
                    onChange={handleChange}
                    defaultChecked={template?.is_default}
                    fieldClass="column mb-0 px-2 pt-3 pb-2">
                    <span>Set as default address</span>
                  </CheckBoxField>
                </div>

              </AddressForm>}
          </section>

        </div>

        <button className="modal-close is-large has-background-dark" aria-label="close" onClick={close}></button>
      </div>
    </Notifier>
  )
};

export default AddressEditModal;
